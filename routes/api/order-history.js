const router = require('express').Router()

const User = require("../../models/User")
const Order = require("../../models/Order")
const Subscription = require("../../models/Subscription")
const SubscriptionType = require("../../models/SubscriptionType")
const BoardgameItem = require("../../models/BoardgameItem")

router.get("/get-current-subscription", async (req, res) => {
    try {
        let customer
        let stripeId = await User.find({email: req.session.user}).select("customerStripeId").limit(1)

        if(stripeId[0].customerStripeId){
            //User already exists in stripe
            customer = stripeId[0].customerStripeId

            let subscriptions = await Subscription.find({ customerStripeId: customer, isActive: true }).populate("subscriptiontype")

            res.status(200).send({ "subscriptions" : subscriptions })

        } else{
            //User doesn't exist in stripe, thus no subscription
            res.status(404).send("No subscription")
        }

    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})


router.get("/get-order-history", async (req, res) => {
    try {
        let customer
        let stripeId = await User.find({email: req.session.user}).select("customerStripeId").limit(1)

        if(stripeId[0].customerStripeId){
            //User already exists in stripe
            customer = stripeId[0].customerStripeId

            let orders = await Order.find({ customerStripeId: customer })
            let allOrderInfo = []
            let boardgameItems = []
            for (let i = 0; i < orders.length; i++) {
                for (let bgitem of orders[i].orderItems) {
                    boardgameItems.push(await BoardgameItem.find({ _id: bgitem }).populate("boardgameId"))
                }
                allOrderInfo.push({
                    order: orders[i],
                    orderItemDetails: boardgameItems
                })
                boardgameItems = []
            }

            res.status(200).send({ "orders" : allOrderInfo })

        } else{
            //User doesn't exist in stripe, thus no order
            res.status(404).send("No Order")
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})



module.exports = router