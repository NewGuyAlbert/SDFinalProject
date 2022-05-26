const router = require('express').Router()

const goToIndexPage = (req, res, next) => {
    if (req.session.user) {
        res.redirect('/');
    } else {
        next();
    }
}

router.get('/subscribe-plan', goToIndexPage, (req, res) => {
    return res.render('./main/subscribe-plan.ejs')
})

module.exports = router