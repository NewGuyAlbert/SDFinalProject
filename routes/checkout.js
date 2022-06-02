const router = require('express').Router()

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

const goToLoginPage = (req, res, next) => {
    if (!req.session.user) {
        res.redirect('/login')
    } else {
        next()
    }
}

router.get("/checkout", goToLoginPage, async (req, res) => {
    try {
        if(!req.session.cart){
            //Cart empty, redirect to shop
            res.redirect('/shop')
        } else{
            let boardgameIds = await reserveBoardgames(req)

            if(boardgameIds == undefined){
                //Some item not in stock
                res.redirect('/shop')
            } else{
                //Check customer if he already exists in stripe
                const User = require("../models/User")
                let customer
    
                let stripeId = await User.find({email: req.session.user}).select("customerStripeId").limit(1)
                
                if(stripeId[0].customerStripeId){
                    //User already exists in stripe
                    customer = stripeId[0].customerStripeId
                } else{
                    
                    //User doesn't exist in stripe, thus create new customer
    
                    const newCustomer = await stripe.customers.create()
    
                    customer = newCustomer.id
                    await User.updateOne({_email: req.session.user}, {$set: {customerStripeId: newCustomer.id}})
                
                }
    
    
                //Get price for each item
                let priceList = await getPrice(req)
                
                let cart = []
                for(let i = 0; i < boardgameIds.length; i++){
                    cart.push({key: boardgameIds[i], name: req.session.cart[i].name, price: priceList[i]})
                }
               
                //payment session
                const checkoutSession = await stripe.checkout.sessions.create({
                    customer: customer,
                    payment_method_types: ['card'],
                    mode: 'payment',
                    shipping_address_collection: {
                        allowed_countries: ['DK'],
                    },
                    line_items: cart.map(boardgame => {
                        // const itemId = boardgame.key
                        return {
                            price_data: {
                                currency: 'dkk',
                                product_data: {
                                    name: boardgame.name
                                },
                                unit_amount: boardgame.price
                            },
                            quantity: 1
                        }
                    }),
                    metadata: boardgameIds,
                    success_url: `${process.env.SERVER_URL}/checkout/success`,
                    cancel_url: `${process.env.SERVER_URL}/checkout/fail`,
                })
    
                //Remove items from cart
                req.session.cart = []
    
                res.redirect(checkoutSession.url)
        }

        
        }
    } catch (error) {
        console.log(error.nessage)
        res.status(500).json({
            error: error.message
        })
    }
})

router.get("/checkout/success", goToLoginPage, (req, res) => {
    res.render("./pages/checkout-success.ejs", {sessionUser: req.session.user})
})

router.get("/checkout/fail", goToLoginPage, (req, res) => {
    res.render("./pages/checkout-fail.ejs", {sessionUser: req.session.user})
})

module.exports = router

 /* 
    We first check to see if the items in the cart are still availalble before
    continuing to a purchase. If they are we reserve them. If payment is succesfull
    they are attached to an order. If payment fails they are unreserved after the webhook.
 */
async function reserveBoardgames(req){
    const BoardgameItem = require("../models/BoardgameItem")

    let availableBoardgames = []
    let index = 0


    for(let selectedBoardgame of req.session.cart){
        let alreadyReservedOne = false

        let allBoardgameItem = await BoardgameItem.find({boardgameId: selectedBoardgame.id})
        for(let item of allBoardgameItem){
            if(item.isAvailable == true && item.condition === "New"){
                if(!alreadyReservedOne){
                    await BoardgameItem.updateOne({_id: item._id}, {$set: {isAvailable: false}})
                    alreadyReservedOne = true
                    availableBoardgames.push(item.id)
                }
            }
        }

        //This if checks if there was no game in stock
        if(!alreadyReservedOne){
            //remove game not in stock
            req.session.cart.splice(index, 1)
            //For returning user back to shop
            return undefined
        }

        index += 1
    }

    return availableBoardgames
}

async function getPrice(req){
    const Boardgame = require("../models/Boardgame")

    let priceList = []

    for(let selectedBoardgame of req.session.cart){
        let data = await Boardgame.find({_id: selectedBoardgame.id}).select("price").limit(1)
        priceList.push(data[0].price)
    }

    return priceList
}