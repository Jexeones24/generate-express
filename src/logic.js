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


function getDuration(timeDomain){
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


function chooseNumberOfMovements(style, duration) {

  let styleObj = styles.filter(s => s.style === style[0])

  let numOfMovementsForDurationArr = styleObj[0].numOfMovementsForDuration[duration]
    console.log('possible num of movements for this duration:', numOfMovementsForDurationArr)
  return random(numOfMovementsForDurationArr, 1);
}

function chooseMovements(numberOfMovements) {
  return random(movements, numberOfMovements);
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

// const isString = (value) => typeof value === 'string'

function chooseRepsByStyle(timeDomain, style, chosenMovements){
  let styleString = style[0]

  if(styleString === 'AMRAP'){
    console.log('hit the amrap')
    return chooseRepsForAMRAP(chosenMovements);
  } else if(styleString === '3RFT' || styleString === '5RFT'){
    console.log('hit the rounds')
    return chooseRepsForRounds(timeDomain, styleString, chosenMovements);
  } else {
    console.log('hit the else statement')
    return chooseRepsForEMOM(timeDomain, chosenMovements);
  }
}



function zip(arr1, arr2) {
  let zipped = [];
  arr1.map((el, idx) => {
    let newArr = [];
    newArr.push(el, arr2[idx]);
    zipped.push(newArr);
  });
  return zipped;
}



function makeWorkout() {
  // how will i get time domain here???
  let workoutObj = {};
  var timeDomain = 30;
  console.log('time:', timeDomain)
  let duration = getDuration(timeDomain);
  let style = chooseStyle(duration);
  console.log('style:', style)
  let numberOfMovements = chooseNumberOfMovements(style, duration);
  console.log('chosen number of movements:', numberOfMovements);
  let chosenMovements = chooseMovements(numberOfMovements);
  console.log('chosen movements are:', chosenMovements)
  let repsPerMovement = chooseRepsByStyle(timeDomain, style, chosenMovements)
  console.log('reps per movement:', repsPerMovement)
  let zipped = zip(repsPerMovement, chosenMovements);
  workoutObj.style = style[0];
  workoutObj.time = timeDomain;
  workoutObj.workout = zipped;
  console.log('workout object:',  workoutObj)
  return workoutObj;
}

makeWorkout();

// make sure E3MOM fits with time domain...or make it E2MOM???
// also need separate switch case for E3MOM, not working correctly bc thinks it's just EMOM
// is that data file the best way to store this sort of data that I'm seeding myself

module.exports = {
  getDuration,
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
  zip,
  makeWorkout
}
