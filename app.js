if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express')
const app = express()

app.use(express.json({verify: (req,res,buf) => { req.rawBody = buf }}))
app.use(express.static("views"))

app.set('view engine', 'ejs')

// loads db
const mongoose = require("./dbConnector.js")


// session
const session = require('express-session')
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60,
        sameSite: false,
        secure: false
    }
}))

const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
// app.use(limiter)

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 40 // limit each IP to 8 requests per windowMs
});
app.use(express.urlencoded({ extended: false }))
// app.use('/signup', authLimiter)
// app.use('/login', authLimiter)
// app.use('/admin/login', authLimiter)


const authRoute = require('./routes/auth.js')
const adminRoute = require('./routes/admin.js')
const mainRoute = require('./routes/main.js')
const redirectRoute = require('./routes/redirect.js')
const cartRoute = require('./routes/api/cart.js')
const checkoutRoute = require('./routes/checkout.js')
const stripeRoute = require('./routes/stripe.js')


app.use(authRoute)
app.use(adminRoute)
app.use(mainRoute)
app.use(redirectRoute)
app.use(cartRoute)
app.use(checkoutRoute)
app.use(stripeRoute)




// Index
app.get('/', (req, res) => {
    return res.render('./pages/index.ejs', { sessionUser: req.session.user })
})

// Start server
const PORT = 3000;
app.listen(PORT, (error) => {
    if (error) {
        console.log(error)
    }
    console.log("Server is running on port", PORT)
})