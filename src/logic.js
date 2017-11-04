const shortAndModerateStyles = ['AMRAP', '3RFT', 'EMOM']
const longOddStyles = ['AMRAP', '5RFT', 'E3MOM']
const longStyles = ['AMRAP', '5RFT']
const data = require('../data.js');
const movements = data.movements;
const styles = data.styles;

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
    return 'short';
  } else if(range(16, 25).includes(timeDomain)){
    return 'moderate';
  } else {
    return 'long';
  }
}


// when duration = long && timeDomain % 3 === 0

function chooseStyle(duration, timeDomain) {
  if(duration === 'short' || duration === 'moderate'){
    return random(shortAndModerateStyles, 1);
  } else if(duration === 'long' && timeDomain % 3 === 0){
    return random(longOddStyles, 1);
  } else {
    return random(longStyles, 1);
  }
}


function chooseNumberOfMovements(style, duration) {
  let styleObj = styles.filter(s => s.style === style[0])
  console.log('styleObj:', styleObj)
  let numOfMovementsForDurationArr = styleObj[0].numOfMovementsForDuration[duration]
    // console.log('possible num of movements for this duration:', numOfMovementsForDurationArr)
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

// timeDomain = 20
// movements = [{sq}, {MU}]
// timesArr = revised total work time per movement based on skill

function chooseRepsForEMOM(timeDomain, chosenMovements) {
  let timesArr = calculateTimePerMovement(timeDomain, chosenMovements)
  return chosenMovements.map((m, i) => Math.round(Math.floor(timesArr[i]/m.secondsPerRep)/timeDomain));
}

// divide totalWorkTime/# of rounds
// https://repl.it/MdFa/6
function chooseRepsForRounds(timeDomain, style, chosenMovements) {
  // console.log(style)
  let rounds = style.join('')[0];
  let timePerMovement = calculateTimePerMovement(timeDomain, chosenMovements);
  let timePerMovementPerRound = timePerMovement.map(t => t/rounds);
  return chosenMovements.map((m, i) => Math.round(Math.ceil(timePerMovementPerRound[i]/m.secondsPerRep)));
}

function chooseRepsForAMRAP(chosenMovements) {
  let number = chosenMovements.length
  let repsArr = [];
  for(var i = 0; i < chosenMovements.length; i++){
    repsArr.push(Math.floor(Math.random() * 40))
  }
  return repsArr;
}


// needs to know when to choose this style?
  // when duration = long && timeDomain % 3 === 0
function chooseRepsForE3MOM(timeDomain, chosenMovements) {
  console.log('E3MOM')
  let timesArr = calculateTimePerMovement(timeDomain, chosenMovements)
  let divisor = timeDomain/3
  // timeDomain = 30
  // time for E3MOM = 10 (10 rounds)
  // [450, 300, 350]/10
  return chosenMovements.map((m, i) => Math.round(Math.floor(timesArr[i]/m.secondsPerRep)/divisor));
}


function chooseRepsByStyle(timeDomain, style, chosenMovements) {
  if(String(style) === 'AMRAP') {
    return chooseRepsForAMRAP(chosenMovements);
  } else if(String(style) === '3RFT' || String(style) === '5RFT') {
    return chooseRepsForRounds(timeDomain, style, chosenMovements);
  } else if(String(style) === 'EMOM') {
    return chooseRepsForEMOM(timeDomain, chosenMovements)
  } else {
    return chooseRepsForE3MOM(timeDomain, chosenMovements);
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



function makeWorkout(timeDomain) {
  let workoutObj = {};
  console.log('time domain:', timeDomain)
  let duration = getDuration(timeDomain);
  console.log('duration:', duration)
  let style = chooseStyle(duration, timeDomain);
  console.log('style:', style)
  let numberOfMovements = chooseNumberOfMovements(style, duration);
  console.log('num of movements:', numberOfMovements)
  let chosenMovements = chooseMovements(numberOfMovements);
  console.log('chosen movements:', chosenMovements)
  let repsPerMovement = chooseRepsByStyle(timeDomain, style, chosenMovements)
  console.log('reps per movement:', repsPerMovement)
  let zipped = zip(repsPerMovement, chosenMovements);
  workoutObj.style = style[0];
  workoutObj.time = timeDomain;
  workoutObj.workout = zipped;
  return workoutObj;
}

makeWorkout();

// also need separate switch case for E3MOM, not working correctly bc thinks it's just EMOM
// is that data file the best way to store this sort of data that I'm seeding myself - should I change it to a JSON file?

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
  chooseRepsForE3MOM,
  zip,
  makeWorkout
}
