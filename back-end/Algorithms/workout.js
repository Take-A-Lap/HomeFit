const db = require('../../back-end/database/dbHelpers');

const generateTwoAbExercises = function(difficulty){
  return new Promise((resolve,reject)=>{
    const workout = [];
    db.getExerciseByMuscleAndDiff(2, difficulty)
    .then((exercises) => {
      let firstIndex = Math.floor(Math.random() * exercises.length);
      let secondIndex = Math.floor(Math.random() * exercises.length);
      workout.push(exercises[firstIndex], exercises[secondIndex]);
    })
    .then(() => {
      if(workout.length === 2){
        resolve(workout)
      } else {
        reject('Ab Rejection')
      }
    })
  })
}
const generateQuadExercises = function(difficulty){
  return new Promise((resolve, reject)=>{
    const workout = [];
    db.getExerciseByMuscleAndDiff(3, difficulty)
    .then((exercises) => {
      const firstIndex = Math.floor(Math.random() * exercises.length);
      const secondIndex = Math.floor(Math.random() * exercises.length);
      const thirdIndex = Math.floor(Math.random() * exercises.length);
      workout.push(exercises[firstIndex], exercises[secondIndex], exercises[thirdIndex]);
    })
    .then(() => {
      if(workout.length === 3){
        resolve(workout)
      } else {
        reject('Other Leg Failure')
      }
    })
  })
}
const generateLegExercises = function(difficulty){
  return new Promise((resolve, reject)=>{
    const workout = [];
    db.getExerciseByMuscleAndDiff(4, difficulty)
    .then((exercises) => {
      const firstIndex = Math.floor(Math.random() * exercises.length);
      const secondIndex = Math.floor(Math.random() * exercises.length);
      const thirdIndex = Math.floor(Math.random() * exercises.length);
      workout.push(exercises[firstIndex], exercises[secondIndex], exercises[thirdIndex]);
    })
    .then(() => {
      if(workout.length === 3){
        resolve(workout)
      } else {
        reject('Leg Rejection')
      }
    })
  })
}
const generateBackArmExercises = function(difficulty){
  return new Promise((resolve, reject)=>{
    const workout = [];
    db.getExerciseByMuscleAndDiff(7, difficulty)
    .then((exercises) => {
      const firstIndex = Math.floor(Math.random() * exercises.length);
      const secondIndex = Math.floor(Math.random() * exercises.length);
      workout.push(exercises[firstIndex], exercises[secondIndex]);
    })
    .then(() => {
      if (workout.length === 2) {
        resolve(workout)
      } else {
        reject('Tricep Rejection')
      }
    })
  })
}
const generateBackExercises = function(difficulty){
  return new Promise((resolve, reject)=>{
    const workout = [];
    db.getExerciseByMuscleAndDiff(8, difficulty)
    .then((exercises) => {
      let firstIndex = Math.floor(Math.random() * exercises.length);
      let secondIndex = Math.floor(Math.random() * exercises.length);
      let thirdIndex = Math.floor(Math.random() * exercises.length);
      let fourthIndex = Math.floor(Math.random() * exercises.length);
      //Push object at indexes of random numbers into the workout array
      workout.push(exercises[firstIndex], exercises[secondIndex], exercises[thirdIndex], exercises[fourthIndex]);
    })
    .then(() => {
      if (workout.length === 4) {
        resolve(workout)
      } else {
        reject('Back Rejection')
      }
    })
  })
}
const generateThreeAbExercises = function(difficulty){
  return new Promise((resolve, reject)=>{
    const workout = [];
    db.getExerciseByMuscleAndDiff(2, difficulty)
    .then((exercises) => {
      let firstIndex = Math.floor(Math.random() * exercises.length);
      let secondIndex = Math.floor(Math.random() * exercises.length);
      workout.push(exercises[firstIndex], exercises[secondIndex]);
    })
    .then(() => {
      if (workout.length === 3) {
        resolve(workout)
      } else {
        reject('Ab Rejection')
      }
    })
  })
}
module.exports = {

  generateWorkoutLeg: function(difficulty){
    return Promise.all([generateQuadExercises(difficulty), generateLegExercises(difficulty), generateTwoAbExercises(difficulty)])
      .catch((err)=>{
        console.error(err)
      })
  },

  generateWorkoutBack: function(difficulty, callback){
    return Promise.all([generateBackExercises(difficulty), generateBackArmExercises(difficulty), generateTwoAbExercises(difficulty)])
      .catch((err) => {
        console.error(err)
      })
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

  generateWorkoutSignUp: function(difficulty){
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
      // clientWorkouts.push(wo);
    });
  setTimeout(() => {
    let jsonWorkouts = [];
    clientWorkouts.forEach((wo)=>{
      jsonWorkouts.push(JSON.stringify(wo))
    })
    return (clientWorkouts)}, 3000);
  },

  generateNextWorkout: function(difficulty){}
}