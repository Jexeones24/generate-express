const express = require('express')
const path = require('path')
const app = express();
const data = require('./data')
const logic = require('./src/logic')
const movements = data.movements;
const styles = data.styles;


app.set('view engine', 'pug')

app.get('/', (req, res) => {

  res.render('index', {
    timeDomain: 15,
    duration: logic.duration(15),
    //how can i pass duration to style??
    style: logic.chooseStyle('long'),
    numberOfMovements: logic.chooseNumberOfMovements('5RFT', 'long'),
    movements: logic.chooseMovements(4),
    repsPerEMOM: logic.chooseRepsForEMOM(15, [{
      name: 'Squat',
      type: 'Weightlifting',
      skill: 'low',
      secondsPerRep: 3,
      url: ''
    },
    {
      name: 'Pullup',
      type: 'Gymnastics',
      skill: 'high',
      secondsPerRep: 2,
      url: ''
    }]),
    repsPerRounds: logic.chooseRepsForRounds(15, '3RFT', [{
        name: 'Snatch',
        type: 'Olympic Weightlifting',
        skill: 'high',
        secondsPerRep: 4,
        url: ''
      },
      {
        name: 'Muscle-up',
        type: 'Gymnastics',
        skill: 'high',
        secondsPerRep: 6,
        url: ''
      },
      {
        name: 'Box Jump',
        type: 'Plyometrics',
        skill: 'low',
        secondsPerRep: 3,
        url: ''
      }]),
    zipped: logic.zip([13, 9, 25], ['Snatch', 'Muscle-up', 'Pullup'])
  })
})

app.get('/new', (req, res) => {
  res.render('new')
})

app.listen(3000)
