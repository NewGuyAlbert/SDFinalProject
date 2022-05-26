const router = require('express').Router()

const goToLoginPage = (req, res, next) => {
    if (!req.session.user) {
        res.redirect('/login')
    } else {
        next()
    }
}

router.get('/redirect', goToLoginPage, (req, res) => {
    console.log(req.query.intent)
    if(req.query.intent){
        switch(req.query.intent) {
            case "shop":
                res.redirect('/shop')
            default:
                return res.redirect('/')
        }
    } else{
        return res.redirect('/')
    }
})

module.exports = router
