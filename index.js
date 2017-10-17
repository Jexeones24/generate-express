const express = require('express');
const path = require('path')
const app = express();
const data = require('./data')
const logic = require('./src/logic')
console.log(data.movements)

app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index', {
    movements: data.movements,
    random: logic.random(data.movements, 2)
  })
})

app.get('/new', (req, res) => {
  res.sendFile(__dirname + '/new.pug')
})

app.listen(3000)
