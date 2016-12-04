'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const User = require('./models/user')

const app = express()
const port = process.env.PORT || 3030

app.set('/statics', express.static('assets'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set('view engine', 'jade')

//Routes
app.get('/', (req, res) => {
    res.render('index')
})

app.get('/login', (req, res) => {
    User.find((err, doc) => {
        console.log(doc)
        res.render('login')
    })
})

app.post('/users', (req, res) => {
    let user = new User({
        email: req.body.email,
        password: req.body.password,
        conf_password: req.body.conf_password,
        username: req.body.username
    })

    user.save((err) => {
        if (err) {
            console.log(String(err))
        }
        res.send('Recibimos tus datos')
    })
})

mongoose.connect('mongodb://localhost:27017/angular', (err, resp) => {
  if (err) {
    return console.log(`Error al conectar la base de datos ${err}`)
  }
  console.log('Conexión a la base de datos establecida...')
  app.listen(port, () => {
    console.log(`API REST corriendo en http://localhost:${port}`)
  })
})