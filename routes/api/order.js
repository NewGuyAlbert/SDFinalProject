const router = require('express').Router()

const BoardgameItem = require('../../models/BoardgameItem')
const Order = require("../../models/Order")

const notAdmin = (req, res, next) => {
    if (req.session.admin) {
        next()
    } else {
        res.status(400)
    }
}

router.get("/get-orders", notAdmin, async (req, res) => {

    try {
        let allOrders = await Order.find()
        let allOrderInfo = []
        let boardgameItems = []
        for (let i = 0; i < allOrders.length; i++) {
            for (let bgitem of allOrders[i].orderItems) {
                boardgameItems.push(await BoardgameItem.find({ _id: bgitem }).populate("boardgameId"))
            }
            allOrderInfo.push({
                order: allOrders[i],
                orderItemDetails: boardgameItems
            })
            boardgameItems = []
        }

        res.status(200).send({ orders: allOrderInfo })
    } catch (error) {
        console.log(error.message)
        res.status(500).send()
    }
})

router.get("/get-order-items", notAdmin, async (req, res) => {

    try {
        let allOrders = await Order.find()
        res.status(200).send({ orders: allOrders })
    } catch (error) {
        console.log(error.message)
        res.status(500).send()
    }
})

router.put("/edit-order-status", notAdmin, async (req, res) => {
    try {
        await Order.updateOne({ _id: req.body.id }, {$set: { orderStatus: req.body.status }})
        res.status(200).send("Edit Success!")
    } catch (error) {
        console.log(error.message)
        res.status(500).send()
    }
})


module.exports = router