const db = require('../../back-end/database/dbHelpers');

module.exports = {

  generateWorkoutLeg: function(difficulty){
  let upperLegExercises = [];
  let otherLegExercises = [];
  let abdominalExercises = [];
  let workout = [];
  
  //Insert db query which returns an array of all upperleg exercises within the difficulty range
  //Save array to resolve
  db.getExerciseByMuscleAndDiff(3, difficulty)
  .then((exercises) => upperLegExercises = exercises)
  .then(() => {
    //Generate three random numbers between 0 and array.length
    let firstIndex = Math.floor(Math.random() * upperLegExercises.length);
    let secondIndex = Math.floor(Math.random() * upperLegExercises.length);
    let thirdIndex = Math.floor(Math.random() * upperLegExercises.length);
    //Push object at indexes of random numbers into the workout array
    workout.push(upperLegExercises[firstIndex], upperLegExercises[secondIndex], upperLegExercises[thirdIndex]);
  })

  //Insert db query which returns an array of all otherleg exercises within the difficulty range
  //Save array to resolve
  db.getExerciseByMuscleAndDiff(4, difficulty)
  .then((exercises)=> otherLegExercises = exercises)
  .then(() => {
    //Generate three random numbers between 0 and array.length
    let firstIndex = Math.floor(Math.random() * otherLegExercises.length);
    let secondIndex = Math.floor(Math.random() * otherLegExercises.length);
    let thirdIndex = Math.floor(Math.random() * otherLegExercises.length);
    //Push object at indexes of random numbers into the workout array
    workout.push(otherLegExercises[firstIndex], otherLegExercises[secondIndex], otherLegExercises[thirdIndex]);
  })
  //Insert db query which returns an array of all abdominal exercises within the difficulty range
  //Save array to resolve
  db.getExerciseByMuscleAndDiff(2, difficulty)
  .then((exercises)=> abdominalExercises = exercises)
  .then(() => {
    //Generate two random numbers between 0 and array.length
    let firstIndex = Math.floor(Math.random() * abdominalExercises.length);
    let secondIndex = Math.floor(Math.random() * abdominalExercises.length);
    //Push object at indexes of random numbers into the workout array
    workout.push(abdominalExercises[firstIndex], abdominalExercises[secondIndex]);
  })
  return workout;
  },

  generateWorkoutBack: function(difficulty){
let backExercises = [];
  let backArmExercises = [];
  let abdominalExercises = [];
  let workout = [];
  
  //Insert db query which returns an array of all back exercises within the difficulty range
  //Save array to resolve
  db.getExerciseByMuscleAndDiff(8, difficulty)
  .then((exercises)=> backExercises = exercises)
  .then(() => {
    //Generate four random numbers between 0 and array.length
    let firstIndex = Math.floor(Math.random() * backExercises.length);
    let secondIndex = Math.floor(Math.random() * backExercises.length);
    let thirdIndex = Math.floor(Math.random() * backExercises.length);
    let fourthIndex = Math.floor(Math.random() * backExercises.length);
    //Push object at indexes of random numbers into the workout array
    workout.push(backExercises[firstIndex], backExercises[secondIndex], backExercises[thirdIndex], backExercises[fourthIndex]);
  })

  //Insert db query which returns an array of all bicep exercises within the difficulty range
  //Save array to resolve
  db.getExerciseByMuscleAndDiff(7, difficulty)
  .then((exercises) => backArmExercises = exercises)
  .then(() => {
    //Generate two random numbers between 0 and array.length
    let firstIndex = Math.floor(Math.random() * backArmExercises.length);
    let secondIndex = Math.floor(Math.random() * backArmExercises.length);
    //Push object at indexes of random numbers into the workout array
    workout.push(backArmExercises[firstIndex], backArmExercises[secondIndex]);
  })
  
  //Insert db query which returns an array of all abdominal exercises within the difficulty range
  //Save array to resolve
  db.getExerciseByMuscleAndDiff(2, difficulty)
  .then((exercises) => abdominalExercises = exercises)
  .then(() => {
    //Generate two random numbers between 0 and array.length
    let firstIndex = Math.floor(Math.random() * abdominalExercises.length);
    let secondIndex = Math.floor(Math.random() * abdominalExercises.length);
    //Push object at indexes of random numbers into the workout array
    workout.push(abdominalExercises[firstIndex], abdominalExercises[secondIndex]);
  })
  return workout;
  },

  generateWorkoutChest: function(difficulty){
  let chestExercises = [];
  let chestArmExercises = [];
  let abdominalExercises = [];
  let workout = [];
  //Insert db query which returns an array of all upperleg exercises within the difficulty range
  //Save array to resolve
  db.getExerciseByMuscleAndDiff(6, difficulty)
    .then((exercises) => chestExercises = exercises)
    .then(() => {
      //Generate four random numbers between 0 and array.length
      let firstIndex = Math.floor(Math.random() * chestExercises.length);
      let secondIndex = Math.floor(Math.random() * chestExercises.length);
      let thirdIndex = Math.floor(Math.random() * chestExercises.length);
      let fourthIndex = Math.floor(Math.random() * chestExercises.length);
      //Push object at indexes of random numbers into the workout array
      workout.push(chestExercises[firstIndex], chestExercises[secondIndex], chestExercises[thirdIndex], chestExercises[fourthIndex]);
    })
  
  //Insert db query which returns an array of all otherleg exercises within the difficulty range
  //Save array to resolve
  db.getExerciseByMuscleAndDiff(5, difficulty)
  .then((exercises) => chestArmExercises = exercises)
  .then(() => {
    //Generate two random numbers between 0 and array.length
    let firstIndex = Math.floor(Math.random() * chestArmExercises.length);
    let secondIndex = Math.floor(Math.random() * chestArmExercises.length);
    //Push object at indexes of random numbers into the workout array
    workout.push(chestArmExercises[firstIndex], chestArmExercises[secondIndex]);
  })
  
  //Insert db query which returns an array of all abdominal exercises within the difficulty range
  //Save array to resolve
  db.getExerciseByMuscleAndDiff(2, difficulty)
  .then((exercises)=> abdominalExercises = exercises)
  .then(() => {
    //Generate two random numbers between 0 and array.length
    let firstIndex = Math.floor(Math.random() * abdominalExercises.length);
    let secondIndex = Math.floor(Math.random() * abdominalExercises.length);
    //Push object at indexes of random numbers into the workout array
    workout.push(abdominalExercises[firstIndex], abdominalExercises[secondIndex]);
  })
  return workout;
  },

  generateWorkoutCardio: function(difficulty){
  let cardioExercises = [];
  let abdominalExercises = [];
  let workout = [];
  //Create promise
  
  //Insert db query which returns an array of all upperleg exercises within the difficulty range
  //Save array to resolve
  db.getExerciseByMuscleAndDiff(1, difficulty)
  .then((exercises)=> cardioExercises = exercises)
  .then(() => {
    //Generate five random numbers between 0 and array.length
    let firstIndex = Math.floor(Math.random() * cardioExercises.length);
    let secondIndex = Math.floor(Math.random() * cardioExercises.length);
    let thirdIndex = Math.floor(Math.random() * cardioExercises.length);
    let fourthIndex = Math.floor(Math.random() * cardioExercises.length);
    let fifthIndex = Math.floor(Math.random() * cardioExercises.length);
    //Push object at indexes of random numbers into the workout array
    workout.push(cardioExercises[firstIndex], cardioExercises[secondIndex], cardioExercises[thirdIndex], cardioExercises[fourthIndex], cardioExercises[fifthIndex]);
  })

  //Insert db query which returns an array of all abdominal exercises within the difficulty range
  //Save array to resolve
  db.getExerciseByMuscleAndDiff(2, difficulty)
  .then((exercises)=> abdominalExercises = exercises)
  .then(() => {
    //Generate three random numbers between 0 and array.length
    let firstIndex = Math.floor(Math.random() * abdominalExercises.length);
    let secondIndex = Math.floor(Math.random() * abdominalExercises.length);
    let thirdIndex = Math.floor(Math.random() * abdominalExercises.length);
    //Push object at indexes of random numbers into the workout array
    workout.push(abdominalExercises[firstIndex], abdominalExercises[secondIndex], abdominalExercises[thirdIndex]); 
  })
  
  return workout;
  },

  generateWorkoutSignUp: function(difficulty){
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
  },

  generateNextWorkout: function(difficulty){}
}