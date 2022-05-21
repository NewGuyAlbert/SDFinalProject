const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.use(express.json())
app.use(express.static("views"))

app.set('view engine', 'ejs');

// connect to cloud database
const uri = "mongodb+srv://NewGuyAlbert:nUxY9Ulhet1s1M5T@sdfpcluster.amdcu.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(
    uri,
    () => {
        console.log("connected to db")
    },
    e => console.error(e)   
)

// session
const session = require('express-session');
app.use(session({
    secret: require('./config/configSession.json').sessionSecret,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60,
        sameSite: true,
        secure: false
    }
}));

const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter)

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 40 // limit each IP to 8 requests per windowMs
});
app.use(express.urlencoded({ extended: false }))
app.use('/signup', authLimiter)
app.use('/login', authLimiter)

// const authRoute = require('./routes/auth.js');
// const usersRoute = require('./routes/users.js');

// app.use(authRoute);
// app.use(usersRoute);

// Redirects
const goToLoginPage = (req, res, next) => {
    if (!req.session.user) {
        res.redirect('/login');
    } else {
        next();
    }
}
const goToHomePage = (req, res, next) => {
    if (req.session.user) {
        res.redirect('/home');
    } else {
        next();
    }
}

// Index
app.get('/', goToHomePage, (req, res) => {
    console.log("session: ", req.sessionID);
    console.log("user: ", req.session.user);

    return res.render('./global/main.ejs', { sessionUser: req.session.user });
})

// Start server
const PORT = 3000;
app.listen(PORT, (error) => {
    if (error) {
        console.log(error);
    }
    console.log("Server is running on port", PORT);
});