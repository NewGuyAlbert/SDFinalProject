const router = require('express').Router()

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_0235a20d59f6021bdcdf83a6d1db8439a093c784491bb7917d015ab9a6abae85";

router.post('/purchase-webhook', (req, res) =>{
    const payload = req.rawBody
    const sig = req.headers['stripe-signature'];

    let event

    try {
        event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
    } catch (err){
        console.log(err.message)
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const order = event.data.object;
    
        console.log(order)
    }

    res.status(200).send()
})

module.exports = router
