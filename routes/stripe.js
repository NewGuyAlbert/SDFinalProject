const router = require('express').Router()

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// This is your Stripe CLI webhook secret
const endpointSecret = process.env.WEBHOOK_PURCHASE

router.post('/purchase-webhook', async (req, res) =>{
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
            await sleep(1000 * 30)
        
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
        await order.save()

    }

    if(event.type === 'checkout.session.expired' || event.type === 'checkout.session.failed') {
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
