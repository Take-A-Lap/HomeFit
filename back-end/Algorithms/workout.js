const db = require('../../back-end/database/dbHelpers');

module.exports = {

  generateWorkoutLeg: function(difficulty, callback){
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
  setTimeout(() => callback(workout), 2000);
  
  
  },

  generateWorkoutBack: function(difficulty, callback){
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
  setTimeout(() => callback(workout), 2000);
  },

  generateWorkoutChest: function(difficulty, callback){
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
  setTimeout(() => callback(workout), 2000);
  },

  generateWorkoutCardio: function(difficulty, callback){
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
  setTimeout(() => callback(workout), 2000);
  },

  generateWorkoutSignUp: function(difficulty, callback){
  let clientWorkouts = [];
  //declare a promise to hold all async calls
    this.generateWorkoutChest(difficulty, (wo)=>{
      clientWorkouts.push(wo);
    });
    this.generateWorkoutCardio(difficulty, (wo) => {
      clientWorkouts.push(wo);
    });
    this.generateWorkoutBack(difficulty, (wo)=>{
      clientWorkouts.push(wo);
    });
    this.generateWorkoutCardio(difficulty, (wo) => {
      clientWorkouts.push(wo);
    });
    this.generateWorkoutLeg(difficulty, (wo) => {
      clientWorkouts.push(wo);
    });
    this.generateWorkoutCardio(difficulty, (wo) => {
      clientWorkouts.push(wo);
    });
    this.generateWorkoutChest(difficulty, (wo) => {
      clientWorkouts.push(wo);
    });
  setTimeout(() => callback(clientWorkouts), 3000);
  },

  generateNextWorkout: function(difficulty){}
}