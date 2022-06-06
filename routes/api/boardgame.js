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

router.get('/get-boardgames', notAdmin, async (req, res) => {

    try {
        let allBoardgameItems = await BoardgameItem.find().populate("boardgameId")
        res.status(200).send({ boardgameItems: allBoardgameItems })
    } catch (error) {
        console.log(error.message)
        res.status(500).send()
    }
})

router.post("/add-boardgame-item", notAdmin, async (req, res) => {
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

router.put("/edit-boardgame-item", notAdmin, async (req, res) => {
    try {
        let newCondition = req.body.condition
        if (newCondition == "New" || newCondition == "Good" || newCondition == "Moderate" || newCondition == "Bad") {
            await BoardgameItem.updateOne({_id: req.body.id}, {$set: {condition: newCondition}})
            res.status(200).send("Edit Success!")
        } else {
            res.status(404).send("Wrong condition.")
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).send(error)
    }
})

router.delete("/delete-boardgame-item", notAdmin, async (req, res) => {
    try {
        let item = await BoardgameItem.find({ _id: req.body.id }).select("isAvailable").limit(1)
        if (item[0].isAvailable) {
            await BoardgameItem.deleteOne({ _id: req.body.id })
            res.status(200).send("Delete succeeded.")
        } else {
            res.status(404).send("Cannot delete the item. The item is attached to an order.")
        }
    } catch (error) {
        console.log(error.message)
        res.status(500).send(error)
    }
})


module.exports = router