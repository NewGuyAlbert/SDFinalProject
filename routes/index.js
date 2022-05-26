const router = require('express').Router()


router.get('/subscribe-plan', (req, res) => {
    return res.render('./pages/subscribe-plan.ejs', { sessionUser: req.session.user })
})

router.get('/shop', (req, res) => {
    if(req.session.user){
        return res.render('./pages/shop-boardgames.ejs')
    } else{
        return res.redirect('/signup?intent=shop')
    }
})

module.exports = router