const shortAndModerateStyles = ['AMRAP', '3RFT', 'EMOM']
const longStyles = ['AMRAP', '5RFT', 'E3MOM']
const data = require('../data.js');
const movements = data.movements;
const styles = data.styles;


// check for valid time domain

function random(arr, numOfItems){
  if(Array.isArray(arr) === false){
    return 'not an array'
  }
  arr.sort(el => 0.5 - Math.random());
  return arr.slice(0, numOfItems);
}


function range(low, high) {
  let rangeArr = [];
  for(let i = low; i <= high; i++){
    rangeArr.push(i)
  }
  return rangeArr;
}


function duration(timeDomain){
  if(range(6, 15).includes(timeDomain)){
    return 'short'
  } else if(range(16, 25).includes(timeDomain)){
    return 'moderate'
  } else {
    return 'long'
  }
}

function chooseStyle(duration) {
  if(duration === 'short' || duration === 'moderate'){
    return random(shortAndModerateStyles, 1);
  } else {
    return random(longStyles, 1);
  }
}


function chooseNumberOfMovements(name, duration) {
  let styleObj = styles.filter(s => s.name === name)
  let durationArr = styleObj[0].durationRanges[duration]
  return random(durationArr, 1);
}

function chooseMovements(num) {
  return random(movements, num);
}

const calculateTotalWorkTime = (timeDomain) => Math.floor((timeDomain * 60) * .75);

// calculates time per movement based on skill
const skillLevelFactor = (movement, timePerMovement) => {
  if(movement.skill === 'high'){
    let secondsToSubtract = 15;
    // factor divides total time per movement into minutes
    // if timePerMovement = 90, then factor is 2 (45 seconds of work time is a scaled minute)
    let factor = Math.floor(timePerMovement/45);
    return timePerMovement - (secondsToSubtract * factor);
  } else if(movement.skill === 'moderate'){
    let secondsToSubtract = 6;
    let factor = Math.floor(timePerMovement/45);
    return timePerMovement - (secondsToSubtract * factor);
  } else {
    return timePerMovement;
  }
}

// returns array of times => (3) [450, 300, 390]
const calculateTimePerMovement = (timeDomain, chosenMovements) => {
  let totalWorkTime = calculateTotalWorkTime(timeDomain);
  let timePerMovement = totalWorkTime/chosenMovements.length;

  return chosenMovements.map(m => skillLevelFactor(m, timePerMovement));
}


// chosenMovements = [{}, {}, {}]
// based on per min
function chooseRepsForEMOM(timeDomain, chosenMovements) {
  let timesArr = calculateTimePerMovement(timeDomain, chosenMovements)
  return chosenMovements.map((m, i) => Math.round(Math.floor(timesArr[i]/m.secondsPerRep)/timeDomain));
}

// divide totalWorkTime/# of rounds
// https://repl.it/MdFa/6
function chooseRepsForRounds(timeDomain, style, chosenMovements) {
  let rounds = style.split('').shift();
  let timePerMovement = calculateTimePerMovement(timeDomain, chosenMovements);
  let timePerMovementPerRound = timePerMovement.map(t => t/rounds);
  return chosenMovements.map((m, i) => Math.round(Math.ceil(timePerMovementPerRound[i]/m.secondsPerRep)));
}

function chooseRepsForAMRAP(chosenMovements) {
  // randomly choose reps
  let number = chosenMovements.length
  let repsArr = [];

  for(var i = 0; i < chosenMovements.length; i++){
    repsArr.push(Math.floor(Math.random() * 40))
  }
  return repsArr;
}


// switch for choosing reps for style
function repsSwitch(style, chosenMovements){
  if(style === 'AMRAP'){
    return chooseRepsForAMRAP(chosenMovements);
  } else if(style === '3RFT' || style === '5RFT'){
    return chooseRepsForRounds(timeDomain, style, chosenMovements);
  } else {
    return chooseRepsForEMOM(timeDomain, chosenMovements);
  }
}


//
function zip(arr1, arr2) {
  let zipped = [];
  arr1.map((el, idx) => {
    let newArr = [];
    newArr.push(el, arr2[idx]);
    zipped.push(newArr);
  });
  return zipped;
}

// to display:
// var names = chosenMovements.map(m => m.name);
// var workout = zip([ 12, 39, 37 ], names);
//
// workout.forEach((set, idx) => console.log(set[0] + ' ' + set[1]));


module.exports = {
  duration,
  random,
  range,
  chooseStyle,
  chooseNumberOfMovements,
  chooseMovements,
  skillLevelFactor,
  calculateTimePerMovement,
  chooseRepsForEMOM,
  chooseRepsForRounds,
  chooseRepsForAMRAP,
  zip
}
