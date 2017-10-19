const express = require('express')
const bodyParser= require('body-parser')
const path = require('path')
const app = express();

const data = require('./data')
const logic = require('./src/logic')

app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'pug')


app.get('/', (req, res) => {
  res.render('index')
})


app.get('/new', (req, res) => {
  res.render('new', { title: 'CREATE NEW WORKOUT' })
})


app.post('/new', function (req, res) {

  let timeDomain =  Number(req.body.timeDomain);

  res.render('show', {
    workoutObj: logic.makeWorkout(timeDomain)
  })
})


app.listen(3000, () => {
  console.log('listening on port 3000')
})

module.exports = app;
