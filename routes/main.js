const router = require('express').Router()


router.get('/subscribe-plan', (req, res) => {
    return res.render('./pages/subscribe-plan.ejs', { sessionUser: req.session.user })
})

router.get('/shop', async (req, res) => {
    if(req.session.user){

        const availableBoardgames = await getAvailableBoardgames()

        return res.render('./pages/shop-boardgames.ejs', {sessionUser: req.session.user, items: availableBoardgames})
    } else{
        return res.redirect('/login?intent=shop')
    }
})

router.get('/about', (req,res) => {
    return res.render('./pages/about.ejs', { sessionUser: req.session.user })
})

router.get('/contact', (req,res) => {
    return res.render('./pages/contact.ejs', { sessionUser: req.session.user })
})

module.exports = router

async function getAvailableBoardgames(){
    const Boardgame = require("../models/Boardgame")
    const BoardgameItem = require("../models/BoardgameItem")

    let availableBoardgames = []

    let allBoardgame = await Boardgame.find()
    for(let boardgame of allBoardgame){
        let amount = 0
        let allBoardgameItem = await BoardgameItem.find({boardgameId: boardgame._id})

        for(let item of allBoardgameItem){
            if(item.isAvailable == true && item.condition === "New"){
                amount += 1
            }
        }
        boardgame.amount = amount
        availableBoardgames.push(boardgame)

        amount = 0
    }

    return availableBoardgames
}