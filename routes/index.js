const router = require('express').Router()


router.get('/subscribe-plan', (req, res) => {
    return res.render('./main/subscribe-plan.ejs', { sessionUser: req.session.user })
})

module.exports = router