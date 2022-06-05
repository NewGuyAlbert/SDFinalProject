const router = require('express').Router()

const Boardgame = require("../../models/Boardgame")
const BoardgameItem = require("../../models/BoardgameItem")

const notAdmin = (req, res, next) => {
    if (req.session.admin) {
        next()
    } else {
        res.status(400)
    }
}

// TODO: notAdmin
router.get('/get-boardgames', async (req, res) => {

    try {
        let allBoardgameItems = await BoardgameItem.find().populate("boardgameId")
        res.status(200).send({ boardgameItems: allBoardgameItems })
    } catch (error) {
        console.log(error.message)
        res.status(500).send()
    }
})

router.post("/add-boardgame-item", async (req, res) => {
    try {
        let boardgame = await Boardgame.find({ name: req.body.name }).select("_id").limit(1)
        let newBoardgameItem = new BoardgameItem({
            boardgameId: boardgame[0]._id,
            condition: req.body.condition
        })
        const newItem = await newBoardgameItem.save()
        res.status(200).send({ newItem: newItem })
    } catch (error) {
        console.log(error.message)
        res.status(500).send()
    }
})


module.exports = router