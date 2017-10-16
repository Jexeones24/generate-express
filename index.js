const express = require('express');
const path = require('path')
const app = express();
const data = require()

app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render(
    'index',
  { title: 'yo, yo, yo!', message: 'Whasssssup???'})
})

app.get('/new', (req, res) => {
  res.sendFile(__dirname + '/new.pug')
})

app.listen(3000)
