'use strict'

const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3030

app.set('/statics', express.static('assets'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.set('view engine', 'jade')

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/login', (req, res) => {
    res.render('login')
})

app.post('/users', (req, res) => {
    console.log(`Contraseña: ${req.body.password}`)
    console.log(`Email: ${req.body.email}`)
    res.send('Recibimos tus datos')
})

app.listen(port, () => {
    console.log(`API REST corriendo en http://localhost:${port}`)
})