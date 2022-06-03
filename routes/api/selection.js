const router = require('express').Router()

const noSession = (req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        res.status(400)
    }
}

router.post('/add-to-selection', noSession, (req, res) => {
    try {
        if(req.session.selection){
            if(req.session.selection.length < req.session.noOfGames){
                let alreadyAdded = false
                for(let i = 0; i < req.session.selection.length; i++){
                    if(req.session.selection[i].id == req.body.id){
                        alreadyAdded = true
                    }
                }
                if(!alreadyAdded){
                    req.session.selection.push(req.body)
                } else {
                    res.status(400).send("Already added")
                }
            } else {
                res.status(400).send("Already at maximum selected games")
            }
            
        } else{
            req.session.selection = []
            req.session.selection.push(req.body)
        }
        res.status(200).send()
    } catch (error) {
        res.status(400).send()
    }
})

router.post('/remove-from-selection', noSession, (req, res) => {
    try {
        if(req.session.selection){
            for(let i = 0; i < req.session.selection.length; i++){
                if(req.session.selection[i].id == req.body.id){
                    req.session.selection.splice(i, 1)
                }
            }
        }
        res.status(200).send(req.session.selection)
    } catch (error) {
        res.status(400).send()
    }
})

router.get('/get-selection', noSession, (req, res) => {
    res.status(200).send(req.session.selection)
})

module.exports = router