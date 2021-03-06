'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const mongoose = require('mongoose')

const User = require('./models/user').User
const routerApp = require('./routes_app')
const sessionMiddleware = require('./middlewares/session')

const app = express()
const port = process.env.PORT || 3030

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json())
app.use(session({
    secret: '123dsae5Aas25',
    resave: false,
    saveUninitialized: false
}))


app.use('/statics', express.static('assets'))
app.set('view engine', 'jade')

//Routes
app.get('/', (req, res) => {
    console.log(req.session.user_id)
    res.render('index')
})

app.get('/signup', (req, res) => {
    User.find((err, doc) => {
        console.log(doc)
        res.render('signup')
    })
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/users', (req, res) => {
    let user = new User({
        email: req.body.email,
        password: req.body.password,
        conf_password: req.body.conf_password,
        username: req.body.username
    })

    user.save().then(function (us) {
        res.send('El usuario se ha guardado correctamente')
    }, function (err) {
        if (err) {
            console.log(String(err))
            res.send('El usuario no se ha guadado')
        }
    })
})

/*
app.post('/sessions', (req, res) => {
    User.findOne({
        email: req.body.email,
        password: req.body.password
    }, function (err, user) {
        req.session.user_id = user._id
        res.send('Hola mundo');
    })
})
*/

app.post("/sessions", function (req, res) {
    User.findOne({
        email: req.body.email,
        password: req.body.password
    }, function (err, user) {
        if (user != null) {
            req.session.user_id = user._id
            res.redirect('/app')
        } else {
            res.render('login')
        }
    })
})

app.use('/app', sessionMiddleware)
app.use('/app', routerApp)

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/angular', (err, resp) => {
    if (err) {
        return console.log(`Error al conectar la base de datos ${err}`)
    }
    console.log('Conexión a la base de datos establecida...')
    app.listen(port, () => {
        console.log(`API REST corriendo en http://localhost:${port}`)
    })
})