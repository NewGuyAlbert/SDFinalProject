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
        //TO DO first check cart tiems if available

        
        let cart = req.session.cart
        const checkoutSession = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            shipping_address_collection: {
                allowed_countries: ['DK'],
            },
            line_items: cart.map(boardgame => {
                const itemId = boardgame.id
                return {
                    price_data: {
                        currency: 'dkk',
                        product_data: {
                            name: boardgame.name
                        },
                        unit_amount: 28000 //TODO get correct price
                    },
                    quantity: 1
                }
            }),
            success_url: `${process.env.SERVER_URL}/checkout/success`,
            cancel_url: `${process.env.SERVER_URL}/checkout/fail`,
        })
        res.redirect(checkoutSession.url)
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
