const router = require('express').Router()

const goToLoginPage = (req, res, next) => {
    if (!req.session.user) {
        res.redirect('/login')
    } else {
        next()
    }
}

router.get('/redirect', goToLoginPage, (req, res) => {
    if(req.query.intent){
        switch(req.query.intent) {
            case "shop":
                res.redirect('/shop')
                break
            case "subscribe":
                if(req.query.plan){
                    res.redirect(`/subscribe?plan=${req.query.plan}`)
                } else{
                    res.redirect('/subscribe-plan')
                }
                break
            default:
                res.redirect('/')
                break
        }
    } else{
        res.redirect('/')
    }
})

module.exports = router
