const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const logic = require('./src/logic')

const PORT = process.env.PORT || 3000

app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'pug')
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/new', (req, res) => {
  res.render('new', { title: 'CREATE NEW WORKOUT' })
})

app.post('/new', function (req, res) {
  let timeDomain = Number(req.body.timeDomain)
  res.render('show', {
    workoutObj: logic.makeWorkout(timeDomain)
  })
})

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})

module.exports = app
