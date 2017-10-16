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
    name: 'AMRAP',
    durationRanges: {
      short: [2, 3],
      moderate: [3, 4],
      long: [5, 6]
    }
  },
  {
    name: 'EMOM',
    durationRanges: {
      short: [1, 2]
    }
  },
  {
    name: '3RFT',
    durationRanges: {
      short: [2, 3],
      moderate: [3, 4]
    }
  },
  {
    name: '5RFT',
    durationRanges: {
      long: [4, 5]
    }
  },
  {
    name: 'E3MOM',
    durationRanges: {
      long: [2, 3]
    }
  }
]




module.exports = {
  movements,
  styles
}
