const express = require('express')
const path = require('path')
const app = express();
const data = require('./data')
const logic = require('./src/logic')
// const movements = data.movements;
// const styles = data.styles;


app.set('view engine', 'pug')

app.get('/', (req, res) => {

  res.render('index', {
    
  })
})

app.get('/new', (req, res) => {
  res.render('new')
})

app.listen(3000)
