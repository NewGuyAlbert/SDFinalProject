const router = require('express').Router()

const nodemailer = require('nodemailer')

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// This is your Stripe CLI webhook secret
const endpointSecret = process.env.WEBHOOK_PURCHASE

router.post('/webhook', async (req, res) => {
    const payload = req.rawBody
    const sig = req.headers['stripe-signature']

    let event
    try {
        event = stripe.webhooks.constructEvent(payload, sig, endpointSecret)
    } catch (err){
        console.log(err.message)
        return res.status(400).send(`Webhook Error: ${err.message}`)
    }

    if(event.type === 'payment_intent.created') {
        res.status(200).send()

        try {
            //Cancel all of the user's other sessions
            const data = event.data.object
            let customer = data.customer

            stripe.checkout.sessions.list().then((sessions) => {
                sessions.data.forEach(session => {
                    //Find open session for the same customer
                    if(session.status == "open" && session.customer == customer){
                        //Not current session
                        if(session.payment_intent != data.id){
                            // Close session
                            stripe.checkout.sessions.expire(
                                session.id
                            ).then(() => {
                                console.log("close previous session")
                            })
                        }
                    }
                })
            })
            
            //Expire session in ms
            //30 minutes time to complete a purchase
            await sleep(1000 * 60 * 30)
        
            //Expire current session
            stripe.checkout.sessions.list({
                payment_intent: data.id
            }).then((sessions) =>{
                if(sessions.data[0].status == "open"){
                    //Only close if it's still open
                    stripe.checkout.sessions.expire(
                        sessions.data[0].id
                    ).then(() => {
                        console.log("closed current session")
                    })
                }
            })

        } catch (error) {
            console.log(error.message)
        }
        
    }

    if(event.type === 'checkout.session.completed') {

        const data = event.data.object

        const Order = require("../models/Order")
        const items = []


        for (const [key, value] of Object.entries(data.metadata)) {
            items.push(value)
        }

        if(object.mode == "subscription"){
            //create order and subscription from metadata

            console.log(items)
        } else {
            let newOrder = {
                shippingAddress:{
                    country: data.shipping.address.country,
                    state: data.shipping.address.state,
                    city: data.shipping.address.city,
                    street: data.shipping.address.line1,
                    postalCode: data.shipping.address.postal_code
                },
                customerStripeId: data.customer,
                orderItems: items
            }
    
            let order = new Order(newOrder)
            const orderId = await order.save()
    
            //Send email with confirmation of purchase
            //Grab item names
            const Boardgame = require("../models/Boardgame")
            const BoardgameItem = require("../models/BoardgameItem")
    
            let itemsName = []
    
            for(let itemId of items){
                let data = await BoardgameItem.find({_id: itemId}).select("boardgameId").limit(1)
                itemsName.push(await Boardgame.find({_id: data[0].boardgameId}).select("name").limit(1))
            }
    
            //email + items + order id
            sendOrderConfirmationEmail(data.customer_details.email, itemsName, orderId._id)
    
        }

    }

    if(event.type === 'checkout.session.expired' || event.type === 'checkout.session.failed') {
        //TODO cover subscription as well
        
        for (const [key, value] of Object.entries(event.data.object.metadata)) {
            unReserve(value)
        }
    }

    res.status(200).send()
})

module.exports = router

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

//Make boardgame item available again because purchase did not finish
async function unReserve(id){
    const BoardgameItem = require("../models/BoardgameItem")
    await BoardgameItem.updateOne({_id: id}, {$set: {isAvailable: true}})
}

function sendOrderConfirmationEmail(email, items, orderNumber){

    let text = ""
    for(let item of items){
        text +="- " + item[0].name + "\n"
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAILER_EMAIL,
          pass: process.env.EMAILER_PASSWORD
        }
      });
      
      const mailOptions = {
        from: process.env.EMAILER_EMAIL,
        to: email,
        subject: 'Order receipt',
        text: "Hello \nThank you for purchasing from us \n Your items are:\n" + text + "Your order number is:" + orderNumber
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}
