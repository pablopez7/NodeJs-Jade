'use strict'

const express = require('express')

const app = express()
const port = process.env.PORT || 3030

app.set('view engine', 'jade')

app.get('/', (req, res) => {
    res.render('index')
})

app.get('/form', (req, res) => {
    res.render('form')
})

app.get('/:nombre', (req, res) => {
    console.log(req.params.nombre)
    res.render('form', {nombre: req.params.nombre})
})

app.post('/', (req, res) => {
    res.render('form')
})

app.listen(port, () => {
    console.log(`API REST corriendo en http://localhost:${port}`)
})