const db = require('../../back-end/database/dbHelpers');

const generateWorkoutLeg = function(difficulty){
  let upperLegExercises = [];
  let otherLegExercises = [];
  let abdominalExercises = [];
  let workout = [];
  //Create promise
  let upperLegPromise = new Promise(function(resolve, reject){
    //Insert db query which returns an array of all upperleg exercises within the difficulty range
    //Save array to resolve
    upperLegExercises = db.getExercise(3, difficulty);
    if(upperLegExercises.length > 0){
      resolve('Upper leg exercises retrieved')
    } else {
      reject('Trouble fetching upper leg exercises')
    }
  })
  let otherLegPromise = new Promise(function (resolve, reject) {
    //Insert db query which returns an array of all otherleg exercises within the difficulty range
    //Save array to resolve
    otherLegExercises = db.getExercise(4, difficulty);
    if (otherLegExercises.length > 0) {
      resolve('Other leg exercises retrieved')
    } else {
      reject('Trouble fetching other leg exercises')
    }
  })
  let abdominalPromise = new Promise(function (resolve, reject) {
    //Insert db query which returns an array of all abdominal exercises within the difficulty range
    //Save array to resolve
    abdominalExercises = db.getExercise(2, difficulty);
    if (abdominalExercises.length > 0) {
      resolve('Abdominal exercises retrieved')
    } else {
      reject('Trouble fetching Abdominal exercises')
    }
  })
  upperLegPromise.then(()=>{
    //Generate three random numbers between 0 and array.length
    let firstIndex = Math.floor(Math.random() * upperLegExercises.length);
    let secondIndex = Math.floor(Math.random() * upperLegExercises.length);
    let thirdIndex = Math.floor(Math.random() * upperLegExercises.length);
    //Push object at indexes of random numbers into the workout array
    workout.push(upperLegExercises[firstIndex], upperLegExercises[secondIndex], upperLegExercises[thirdIndex]);
  })
  otherLegPromise.then(() => {
    //Generate three random numbers between 0 and array.length
    let firstIndex = Math.floor(Math.random() * otherLegExercises.length);
    let secondIndex = Math.floor(Math.random() * otherLegExercises.length);
    let thirdIndex = Math.floor(Math.random() * otherLegExercises.length);
    //Push object at indexes of random numbers into the workout array
    workout.push(otherLegExercises[firstIndex], otherLegExercises[secondIndex], otherLegExercises[thirdIndex]);
  })
  abdominalPromise.then(() => {
    //Generate two random numbers between 0 and array.length
    let firstIndex = Math.floor(Math.random() * abdominalExercises.length);
    let secondIndex = Math.floor(Math.random() * abdominalExercises.length);
    //Push object at indexes of random numbers into the workout array
    workout.push(abdominalExercises[firstIndex], abdominalExercises[secondIndex]);
  })
  return workout;
}

const generateWorkoutBack = function(difficulty){
let backExercises = [];
  let backArmExercises = [];
  let abdominalExercises = [];
  let workout = [];
  //Create promise
  let backPromise = new Promise(function (resolve, reject) {
    //Insert db query which returns an array of all upperleg exercises within the difficulty range
    //Save array to resolve
    backExercises = db.getExercise(8, difficulty);
    if (backExercises.length > 0) {
      resolve('Back exercises retrieved')
    } else {
      reject('Trouble fetching Back exercises')
    }
  })
  let backArmPromise = new Promise(function (resolve, reject) {
    //Insert db query which returns an array of all otherleg exercises within the difficulty range
    //Save array to resolve
    backArmExercises = db.getExercise(7, difficulty);
    if (backArmExercises.length > 0) {
      resolve('Bicep exercises retrieved')
    } else {
      reject('Trouble fetching Bicep exercises')
    }
  })
  let abdominalPromise = new Promise(function (resolve, reject) {
    //Insert db query which returns an array of all abdominal exercises within the difficulty range
    //Save array to resolve
    abdominalExercises = db.getExercise(2, difficulty);
    if (abdominalExercises.length > 0) {
      resolve('Abdominal exercises retrieved')
    } else {
      reject('Trouble fetching Abdominal exercises')
    }
  })
  backPromise.then(() => {
    //Generate four random numbers between 0 and array.length
    let firstIndex = Math.floor(Math.random() * backExercises.length);
    let secondIndex = Math.floor(Math.random() * backExercises.length);
    let thirdIndex = Math.floor(Math.random() * backExercises.length);
    let fourthIndex = Math.floor(Math.random() * backExercises.length);
    //Push object at indexes of random numbers into the workout array
    workout.push(backExercises[firstIndex], backExercises[secondIndex], backExercises[thirdIndex], backExercises[fourthIndex]);
  })
  backArmPromise.then(() => {
    //Generate two random numbers between 0 and array.length
    let firstIndex = Math.floor(Math.random() * backArmExercises.length);
    let secondIndex = Math.floor(Math.random() * backArmExercises.length);
    //Push object at indexes of random numbers into the workout array
    workout.push(backArmExercises[firstIndex], backArmExercises[secondIndex]);
  })
  abdominalPromise.then(() => {
    //Generate two random numbers between 0 and array.length
    let firstIndex = Math.floor(Math.random() * abdominalExercises.length);
    let secondIndex = Math.floor(Math.random() * abdominalExercises.length);
    //Push object at indexes of random numbers into the workout array
    workout.push(abdominalExercises[firstIndex], abdominalExercises[secondIndex]);
  })
  return workout;
}

const generateWorkoutChest = function(difficulty){
  let chestExercises = [];
  let chestArmExercises = [];
  let abdominalExercises = [];
  let workout = [];
  //Create promise
  let chestPromise = new Promise(function (resolve, reject) {
    //Insert db query which returns an array of all upperleg exercises within the difficulty range
    //Save array to resolve
    chestExercises = db.getExercise(6, difficulty);
    if (chestExercises.length > 0) {
      resolve('Chest exercises retrieved')
    } else {
      reject('Trouble fetching chest exercises')
    }
  })
  let chestArmPromise = new Promise(function (resolve, reject) {
    //Insert db query which returns an array of all otherleg exercises within the difficulty range
    //Save array to resolve
    chestArmExercises = db.getExercise(5, difficulty);
    if (chestArmExercises.length > 0) {
      resolve('Tricep exercises retrieved')
    } else {
      reject('Trouble fetching tricep exercises')
    }
  })
  let abdominalPromise = new Promise(function (resolve, reject) {
    //Insert db query which returns an array of all abdominal exercises within the difficulty range
    //Save array to resolve
    abdominalExercises = db.getExercise(2, difficulty);
    if (abdominalExercises.length > 0) {
      resolve('Abdominal exercises retrieved')
    } else {
      reject('Trouble fetching Abdominal exercises')
    }
  })
  chestPromise.then(() => {
    //Generate four random numbers between 0 and array.length
    let firstIndex = Math.floor(Math.random() * chestExercises.length);
    let secondIndex = Math.floor(Math.random() * chestExercises.length);
    let thirdIndex = Math.floor(Math.random() * chestExercises.length);
    let fourthIndex = Math.floor(Math.random() * chestExercises.length);
    //Push object at indexes of random numbers into the workout array
    workout.push(chestExercises[firstIndex], chestExercises[secondIndex], chestExercises[thirdIndex], chestExercises[fourthIndex]);
  })
  chestArmPromise.then(() => {
    //Generate two random numbers between 0 and array.length
    let firstIndex = Math.floor(Math.random() * chestArmExercises.length);
    let secondIndex = Math.floor(Math.random() * chestArmExercises.length);
    //Push object at indexes of random numbers into the workout array
    workout.push(chestArmExercises[firstIndex], chestArmExercises[secondIndex]);
  })
  abdominalPromise.then(() => {
    //Generate two random numbers between 0 and array.length
    let firstIndex = Math.floor(Math.random() * abdominalExercises.length);
    let secondIndex = Math.floor(Math.random() * abdominalExercises.length);
    //Push object at indexes of random numbers into the workout array
    workout.push(abdominalExercises[firstIndex], abdominalExercises[secondIndex]);
  })
  return workout;
}

const generateWorkoutCardio = function(difficulty){
  let cardioExercises = [];
  let abdominalExercises = [];
  let workout = [];
  //Create promise
  let cardioPromise = new Promise(function (resolve, reject) {
    //Insert db query which returns an array of all upperleg exercises within the difficulty range
    //Save array to resolve
    cardioExercises = db.getExercise(1, difficulty);
    if (cardioExercises.length > 0) {
      resolve('Cardio exercises retrieved')
    } else {
      reject('Trouble fetching cardio exercises')
    }
  })
  let abdominalPromise = new Promise(function (resolve, reject) {
    //Insert db query which returns an array of all abdominal exercises within the difficulty range
    //Save array to resolve
    abdominalExercises = db.getExercise(2, difficulty);
    if (abdominalExercises.length > 0) {
      resolve('Abdominal exercises retrieved')
    } else {
      reject('Trouble fetching Abdominal exercises')
    }
  })
  cardioPromise.then(() => {
    //Generate five random numbers between 0 and array.length
    let firstIndex = Math.floor(Math.random() * upperLegExercises.length);
    let secondIndex = Math.floor(Math.random() * upperLegExercises.length);
    let thirdIndex = Math.floor(Math.random() * upperLegExercises.length);
    let fourthIndex = Math.floor(Math.random() * upperLegExercises.length);
    let fifthIndex = Math.floor(Math.random() * upperLegExercises.length);
    //Push object at indexes of random numbers into the workout array
    workout.push(cardioExercises[firstIndex], cardioExercises[secondIndex], cardioExercises[thirdIndex], cardioExercises[fourthIndex], cardioExercises[fifthIndex]);
  })
  abdominalPromise.then(() => {
    //Generate three random numbers between 0 and array.length
    let firstIndex = Math.floor(Math.random() * abdominalExercises.length);
    let secondIndex = Math.floor(Math.random() * abdominalExercises.length);
    let thirdIndex = Math.floor(Math.random() * abdominalExercises.length);
    //Push object at indexes of random numbers into the workout array
    workout.push(abdominalExercises[firstIndex], abdominalExercises[secondIndex], abdominalExercises[thirdIndex]); 
  })
  return workout;
}

const generateWorkoutSignUp = function(difficulty){
  let clientWorkouts = [];
  //declare a promise to hold all async calls
  let newClientPromise = new Promise(function(resolve, reject){
    let chestOne = generateWorkoutChest(difficulty);
    let chestTwo = generateWorkoutChest(difficulty);
    let back = generateWorkoutBack(difficulty);
    let leg = generateWorkoutLeg(difficulty);
    let cardioOne = generateWorkoutCardio(difficulty);
    let cardioTwo = generateWorkoutCardio(difficulty);
    let cardioThree = generateWorkoutCardio(difficulty);
    if(cardioThree.length > 0){
      resolve('New client\'s workouts created')
    } else {
      reject('Trouble creating new client\'s workout')
    }
  })
  //push all async call results into an array
  newClientPromise.then((chestOne, chestTwo, back, leg, cardioOne, cardioTwo, cardioThree)=>{
    clientWorkouts.push(chestOne, chestTwo, back, leg, cardioOne, cardioTwo, cardioThree);
  })
  return clientWorkouts;
}

const generateNextWorkout = function(difficulty){};