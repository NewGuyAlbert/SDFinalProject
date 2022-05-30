const router = require('express').Router()

const noSession = (req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        res.status(400)
    }
}

router.post('/add-to-cart', noSession, (req, res) => {
    try {
        if(req.session.cart){
            let alreadyAdded = false
            for(let i = 0; i < req.session.cart.length; i++){
                if(req.session.cart[i].id == req.body.id){
                    alreadyAdded = true
                }
            }
            if(!alreadyAdded){
                req.session.cart.push(req.body)
            } else {
                res.status(400).send("Already added")
            }
        } else{
            req.session.cart = []
            req.session.cart.push(req.body)
        }
        res.status(200).send()
    } catch (error) {
        res.status(400).send()
    }
})

router.post('/remove-from-cart', noSession, (req, res) => {
    try {
        if(req.session.cart){
            for(let i = 0; i < req.session.cart.length; i++){
                if(req.session.cart[i].id == req.body.id){
                    req.session.cart.splice(i, 1)
                }
            }
        }
        res.status(200).send(req.session.cart)
    } catch (error) {
        res.status(400).send()
    }
})
 
router.get('/get-cart', noSession, (req, res) => {
    res.status(200).send(req.session.cart)
})


module.exports = router