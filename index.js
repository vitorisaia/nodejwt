var express = require('express')
var jwt = require('jsonwebtoken')
const app = express()

app.get('/api', function (req,res) {
    res.json({
        text: 'my api!'
    })
})

app.get('/api/protected', fetchToken, function (req,res) {

    jwt.verify(req.token, 'my_secret_key', function(err, data){
        if (err) {
            res.sendStatus(403)
        } else {
            console.log('user id: ' + data.user.id)
            res.json({
                text: 'this is protected',
                data: data
            })
        }
    })
})

function fetchToken(req,res,next) {
    const bearerHeader = req.headers['authorization']

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(" ")
        const bearerToken = bearer[1]
        req.token = bearerToken
        next()
    }
    else {
        res.sendStatus(403)
    }
}

app.post('/api/login', function (req,res) {
    //we'd actually use bodyparser to retrieve user and password data,
    //but here we'll just pretend we're doing that
    const user = {id:3}
    const token = jwt.sign({user}, 'my_secret_key')

    res.json({
        token:token
    })

})

app.listen(3000, function () {
    console.log('App listening on port 3000')
})