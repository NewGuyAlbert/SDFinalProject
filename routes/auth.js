const router = require('express').Router()
const emailValidator = require('email-validator')

const User = require("../models/User")

/* Bcrypt */
const bcrypt = require('bcrypt')
const saltRounds = 12

const goToHomePage = (req, res, next) => {
    if (req.session.user) {
        res.redirect('/')
    } else {
        next()
    }
}

router.get('/signup', goToHomePage, (req, res) => {
    return res.render('./auth/signup.ejs')
})

router.get('/login', goToHomePage, (req, res) => {
    return res.render('./auth/login.ejs')
})

router.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password, passwordRepeat } = req.body;
    const isPasswordTheSame = password === passwordRepeat;
    
    if (firstName && lastName && email && password && isPasswordTheSame) {

        if(password.length < 8) {
            return res.status(400).send({ response: "Password does not fulfill the requirements" })
        } else if(!emailValidator.validate(email)){
            return res.status(400).send({ response: "Email is not valid" })
        } else {
            try{

                const emailFound = await User.find({email: email})

                if(emailFound.length > 0){
                    if(req.query.intent){
                        return res.redirect(req.originalUrl + "&error")
                    } else{
                        return res.redirect("/signup?error")
                    }
                } else {
                    const hashedPassword = await bcrypt.hash(password, saltRounds)
                    const newUser = new User({firstName: firstName, lastName: lastName, email: email, password: hashedPassword})
                    newUser.save().then(() => {
                        console.log("New user added")
                        req.session.user = email
                        req.session.role = "customer"

                        if(req.query.intent){
                            if(req.query.plan){
                                return res.redirect("/redirect?intent=" + req.query.intent + "&plan=" + req.query.plan)
                            } else{
                                return res.redirect("/redirect?intent=" + req.query.intent)
                            }
                        } else{
                            return res.redirect("/")
                        }
                    })
                }

            }catch(error){
                console.log(error.message)
                return res.status(500).send({ response: "Something went wrong with the database.", error })
            }
        }
    }else if (password && passwordRepeat && !isPasswordTheSame) {
        return res.status(400).send({ response: "Passwords do not match. Fields: password and passwordRepeat" });
    } else {
        return res.status(400).send({ response: "Missing fields: username, password, passwordRepeat" });
    }
})

router.post("/login", async (req, res) => {
    const { email, password } = req.body
    
    if (email && password){
        try{
            User.find().where({email: email}).then( async userFound => {
                if (userFound.length == 0) {
                    if(req.query.intent){
                        return res.redirect(req.originalUrl + "&error")
                    } else{
                        return res.redirect("/login?error")
                    }
                } else {
                    const matchingPassword = await User.find().where({email: email}).select('password')
                    const passwordToValidate = matchingPassword[0].password;

                    bcrypt.compare(password, passwordToValidate).then((result) => {
                        if (result) {
                            req.session.user = email
                            if(req.query.intent){
                                if(req.query.plan){
                                    return res.redirect("/redirect?intent=" + req.query.intent + "&plan=" + req.query.plan)
                                } else{
                                    return res.redirect("/redirect?intent=" + req.query.intent)
                                }
                            } else{
                                return res.redirect("/")
                            }
                        } else {
                            if(req.query.intent){
                                return res.redirect(req.originalUrl + "&error")
                            } else{
                                return res.redirect("/login?error")
                            }
                        }
                    })
                }
            })


        } catch (error) {
        console.log(error.message)
        if(req.query.intent){
            return res.redirect(req.originalUrl + "&error")
        } else{
            return res.redirect("/login?error")
        }
        }

    } else {
        if(req.query.intent){
            return res.redirect(req.originalUrl + "&error")
        } else{
            return res.redirect("/login?error")
        }
    }
})

router.get("/logout", (req, res) => {
    req.session.destroy((error) => {
        if(error){
            console.log("Error happend when logging out:", error.message);
        }
    });
    return res.redirect('/');
});

module.exports = router