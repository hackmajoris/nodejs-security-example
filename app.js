const config = require('./config/config')
const express = require('express')
const {mongoose} = require('./db/mongoose')
const bodyParser = require('body-parser')
var userController = require('./controllers/userController')

var app = express()
const port = process.env.PORT

app.use(bodyParser.json())

app.listen(port, (err, res) => {
    if (err) throw err
    
    console.log("Server is up")
})

app.get('/test', (req, res) => {
    res.send('ok')
})

userController(app)

module.exports = {app, userController}

