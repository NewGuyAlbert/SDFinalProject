const router = require('express').Router()


router.get('/subscribe-plan', async (req, res) => {

    const allSubscriptions = await getAllSubscriptionTypes()

    return res.render('./pages/subscribe-plan.ejs', { sessionUser: req.session.user, subscriptionTypes: allSubscriptions})
})

router.get('/shop', async (req, res) => {
    if(req.session.user){

        const availableBoardgames = await getAvailableBoardgames("New")

        return res.render('./pages/shop-boardgames.ejs', {
            sessionUser: req.session.user, 
            items: availableBoardgames,
            subscriptionName: false
        })
    } else{
        return res.redirect('/login?intent=shop')
    }
})

router.get('/subscribe', async (req, res) => {
    if(req.session.user){
        if(req.query.plan){
            const allSubscriptions = await getAllSubscriptionTypes()
            let isValidPlan = false
            let noOfGames 
            let subscriptionName

            for(let subscriptionType of allSubscriptions){
                if(subscriptionType.plan == req.query.plan){
                    isValidPlan = true
                    noOfGames = subscriptionType.noOfBoardgames
                    subscriptionName = subscriptionType.name
                    if(req.session.noOfGames != noOfGames){
                        //Empty selection if plan changes
                        req.session.selection = []
                    }
                    req.session.noOfGames = noOfGames
                }
            }

            if(isValidPlan){
                const availableBoardgames = await getAvailableBoardgames("Good")

                //Add plan to session
                req.session.subscriptionPlan = req.query.plan
        
                //TODO Also send current games attached to user if he has already subscribed
                return res.render('./pages/subscribe-boardgames.ejs', {
                    sessionUser: req.session.user, 
                    items: availableBoardgames, 
                    subscriptionName: subscriptionName,
                    totalGames: noOfGames
                })
            } else {
                return res.redirect('/subscribe-plan')
            }
        } else{
            return res.redirect('/subscribe-plan')
        }
    } else{
        if(req.query.plan){
            return res.redirect(`/login?intent=subscribe&plan=${req.query.plan}`)
        } else {
            return res.redirect('/login?intent=subscribe')
        }
    }

})

router.get('/about', (req,res) => {
    return res.render('./pages/about.ejs', { sessionUser: req.session.user })
})

router.get('/contact', (req,res) => {
    return res.render('./pages/contact.ejs', { sessionUser: req.session.user })
})

module.exports = router

async function getAvailableBoardgames(condition){
    const Boardgame = require("../models/Boardgame")
    const BoardgameItem = require("../models/BoardgameItem")

    let availableBoardgames = []

    let allBoardgame = await Boardgame.find()
    for(let boardgame of allBoardgame){
        let amount = 0
        let allBoardgameItem = await BoardgameItem.find({boardgameId: boardgame._id})

        for(let item of allBoardgameItem){
            if(condition === "New"){
                if(item.isAvailable == true && item.condition === "New"){
                    amount += 1
                }
            } else {
                if(item.isAvailable == true && item.condition != "New" && item.condition != "Bad"){
                    amount += 1
                }
            }
        }
        boardgame.amount = amount
        availableBoardgames.push(boardgame)

        amount = 0
    }

    return availableBoardgames
}

async function getAllSubscriptionTypes(){
    const SubscriptionType = require("../models/SubscriptionType")

    const allSubscriptionTypes = await SubscriptionType.find()

    return allSubscriptionTypes
}