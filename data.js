const movements = [
  {
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
  },
  {
    name: 'Wallball',
    type: 'Odd Object',
    skill: 'moderate',
    secondsPerRep: 3,
    url: ''
  },
  {
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
  }
]



const styles = [
  {
    style: 'AMRAP',
    numOfMovementsForDuration: {
      short: [2, 3],
      moderate: [3, 4],
      long: [5, 6]
    }
  },
  {
    style: 'EMOM',
    numOfMovementsForDuration: {
      short: [1, 2]
    }
  },
  {
    style: '3RFT',
    numOfMovementsForDuration: {
      short: [2, 3],
      moderate: [3, 4]
    }
  },
  {
    style: '5RFT',
    numOfMovementsForDuration: {
      long: [4, 5]
    }
  },
  {
    style: 'E3MOM',
    numOfMovementsForDuration: {
      long: [2, 3]
    }
  }
]




module.exports = {
  movements,
  styles
}
