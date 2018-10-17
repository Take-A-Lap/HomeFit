const db = require('../../back-end/database/dbHelpers');

const generateTwoAbExercises = function (difficulty) {
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
        const firstIndex = Math.floor(Math.random() * exercises.length);
        const secondIndex = Math.floor(Math.random() * exercises.length);
        const thirdIndex = Math.floor(Math.random() * exercises.length);
        const fourthIndex = Math.floor(Math.random() * exercises.length);
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
  const generateChestExercises = function(difficulty){
    return new Promise ((resolve, reject)=>{
      const workout = [];
      db.getExerciseByMuscleAndDiff(6, difficulty)
      .then((exercises) => {
        //Generate four random numbers between 0 and array.length
        const firstIndex = Math.floor(Math.random() * exercises.length);
        const secondIndex = Math.floor(Math.random() * exercises.length);
        const thirdIndex = Math.floor(Math.random() * exercises.length);
        const fourthIndex = Math.floor(Math.random() * exercises.length);
        //Push object at indexes of random numbers into the workout array
        workout.push(exercises[firstIndex], exercises[secondIndex], exercises[thirdIndex], exercises[fourthIndex]);
      })
      .then(() => {
        if (workout.length === 4) {
          resolve(workout)
        } else {
          reject('Chest Rejection')
        }
      })
    })
  }
  const generateTricepExercises = function(difficulty){
    return new Promise((resolve, reject)=>{
      const workout = [];
      db.getExerciseByMuscleAndDiff(5, difficulty)
      .then((exercises) => {
        const firstIndex = Math.floor(Math.random() * exercises.length);
        const secondIndex = Math.floor(Math.random() * exercises.length);
        workout.push(exercises[firstIndex], exercises[secondIndex]);
      })
      .then(() => {
        if(workout.length === 2){
          resolve(workout);
        } else {
          reject('Tricep Rejection')
        }
      })
    })
  }
  const generateCardioExercises =function(difficulty){
    return new Promise((resolve, reject)=>{
      const workout = [];
      db.getExerciseByMuscleAndDiff(1, difficulty)
      .then((exercises) => {
        //Generate five random numbers between 0 and array.length
        const firstIndex = Math.floor(Math.random() * exercises.length);
        const secondIndex = Math.floor(Math.random() * exercises.length);
        const thirdIndex = Math.floor(Math.random() * exercises.length);
        const fourthIndex = Math.floor(Math.random() * exercises.length);
        const fifthIndex = Math.floor(Math.random() * exercises.length);
        //Push object at indexes of random numbers into the workout array
        workout.push(
          exercises[firstIndex], 
          exercises[secondIndex], 
          exercises[thirdIndex], 
          exercises[fourthIndex], 
          exercises[fifthIndex]
        );
      })
        .then(() => {
          if(workout.length === 5){
            resolve(workout);
          } else {
            reject('Cardio Rejection');
          }
        })
    })
  }
  const generateThreeAbExercises = function(difficulty){
    return new Promise((resolve, reject)=>{
      const workout = [];
      db.getExerciseByMuscleAndDiff(2, difficulty)
      .then((exercises) => {
        const firstIndex = Math.floor(Math.random() * exercises.length);
        const secondIndex = Math.floor(Math.random() * exercises.length);
        const thirdIndex = Math.floor(Math.random() * exercises.length);
        workout.push(exercises[firstIndex], exercises[secondIndex], exercises[thirdIndex]);
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

  test:()=>{
    return generateTwoAbExercises(3)
    .catch(err=>console.error(err));
  },

  generateWorkoutLeg: function(difficulty){
    return Promise.all([generateQuadExercises(difficulty), generateLegExercises(difficulty), generateTwoAbExercises(difficulty)])
      .then(results => results.reduce((final, curr) => final.concat(curr)))
      .catch((err)=>{
        console.error(err)
      })
  },

  generateWorkoutBack: function(difficulty){
    return Promise.all([generateBackExercises(difficulty), generateBackArmExercises(difficulty), generateTwoAbExercises(difficulty)])
      .then(results => results.reduce((final, curr) => final.concat(curr)))
      .catch((err) => {
        console.error(err)
      })
  },

  generateWorkoutChest: function(difficulty){
    return Promise.all([generateChestExercises(difficulty), generateTricepExercises(difficulty), generateTwoAbExercises(difficulty)])
      .then(results => results.reduce((final, curr) => final.concat(curr)))
      .catch((err) => {
        console.error(err)
      })
  },

  generateWorkoutCardio: function(difficulty){
    return Promise.all([generateCardioExercises(difficulty), generateThreeAbExercises(difficulty)])
    .then(results=>results.reduce((final,curr)=>final.concat(curr)))  
    .catch(err=>console.error(err));
  },

  generateWorkout: function(wo_num, difficulty){
    return new Promise((resolve, reject)=>{
      let solution;
      if (wo_num === 0 || wo_num % 6 === 0) {
        this.generateWorkoutChest(difficulty)
        .then(wo => {
          console.log(wo)
          solution = wo
          if (solution) {
            resolve(solution)
          } else {
            reject('Error Fetching Workout')
          }
        })
        .catch(err=>console.error(err))
      } else if (wo_num % 2 === 1) {
        this.generateWorkoutCardio(difficulty)
        .then(wo => {
          solution = wo
          if (solution) {
            resolve(solution)
          } else {
            reject('Error Fetching Workout')
          }
        })
        .catch(err => console.error(err))
      } else if (wo_num % 4 === 0) {
        this.generateWorkoutLeg(difficulty)
        .then(wo => {
          solution = wo
          if (solution) {
            resolve(solution)
          } else {
            reject('Error Fetching Workout')
          }
        })
        .catch(err => console.error(err))
      } else if (wo_num % 2 === 0) {
        this.generateWorkoutBack(difficulty)
        .then(wo => {
          solution = wo
          if (solution) {
            resolve(solution)
          } else {
            reject('Error Fetching Workout')
          }
        })
        .catch(err => console.error(err))
      }
    })
  },

  generateNextWorkout: function(difficulty){}
}