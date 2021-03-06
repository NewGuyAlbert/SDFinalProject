const router = require('express').Router()
const nodemailer = require('nodemailer')

const Admin = require("../models/Admin")

function sendEmail(email, code){
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAILER_EMAIL,
          pass: process.env.EMAILER_PASSWORD
        }
      });
      
      const mailOptions = {
        from: process.env.EMAILER_EMAIL,
        to: email,
        subject: 'Two Factor Authentication',
        text: "Hello \nVerification code is: " + code
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}

const goToAdminLoginPage = (req, res, next) => {
    if (!req.session.admin) {
        res.redirect('/admin/login')
    } else {
        next()
    }
}

const goToAdminDashboard = (req, res, next) => {
    if (req.session.admin) {
        res.redirect('/admin/dashboard')
    } else  {
        next()
    }
}

router.get('/admin', goToAdminDashboard, (req, res) => {
    return res.render('./admin/admin-index.ejs')
})

router.get('/admin/dashboard', goToAdminLoginPage, (req, res) => {
    return res.render('./admin/admin-dashboard.ejs', { sessionAdmin: req.session.admin, boardgameTable: true })
})

router.get('/admin/login', (req, res) => {
    return res.render('./admin/login.ejs')
})

router.post("/admin/login", async (req, res) => {
    const { email, key } = req.body

    let isAdmin = false
    
    if(email && key){
        const data = await Admin.find()

        data[0].emails.forEach(element => {
            if(element.email === email){
                isAdmin = true
            }
        });

        if(isAdmin){

            if(data[0].key === key){
                //Generate Code
                req.session.adminCode = Math.floor(100000 + Math.random() * 900000)
                req.session.saveAdmin = email

                sendEmail(email, req.session.adminCode)
                verificationCodeTimer(req)
                res.render('./admin/logintwofa.ejs')

            } else{
                return res.redirect("/admin/login?error1")
            }

        } else{
            return res.redirect("/admin/login?error1")
        }
       

        
        
    } else{
        return res.status(400).send({ response: "Missing fields: key or email" })
    }
})

router.post("/admin/logintwofa", async (req, res) => {
    const {code} = req.body

    if(code){
        // console.log(req.session.adminCode)
        // console.log(code)

        if(req.session.adminCode == code){
            req.session.admin = req.session.saveAdmin
            req.session.saveAdmin = undefined
            
            return res.redirect("/admin/dashboard")
        } else{
            return res.redirect("/admin/login?error2")
        }
    } else{
        return res.status(400).send({ response: "Missing fields: code" })

    }
})

router.get('/admin/boardgame', goToAdminLoginPage, (req, res) => {
    return res.render('./admin/admin-dashboard.ejs', { sessionAdmin: req.session.admin, boardgameTable: true, orderTable: false, subscriptionTable: false })
})

router.get('/admin/order', goToAdminLoginPage, (req, res) => {
    return res.render('./admin/admin-dashboard.ejs', { sessionAdmin: req.session.admin, boardgameTable: false, orderTable: true, subscriptionTable: false })
})

router.get('/admin/logout', (req, res) => {
    req.session.destroy((error) => {
        if(error){
            console.log("Error happend when logging out:", error.message);
        }
    });
    return res.redirect("/admin")
})

async function verificationCodeTimer(req){
    await sleep(60000)
    if(req.session.admin == undefined){
        req.session.adminCode = undefined
        req.session.saveAdmin = undefined
        req.session.save(err => {
            if (err) {
              throw err
            }
        })
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

module.exports = router
