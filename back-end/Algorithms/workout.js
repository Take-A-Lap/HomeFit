const db = require('../../back-end/database/dbHelpers');


  const generateQuadExercise = function(difficulty){
    return new Promise((resolve, reject)=>{
      db.getExerciseByMuscleAndDiff(3, difficulty)
      .then((exercises) => {
        if(exercises){
          resolve(exercises[Math.floor(Math.random() * exercises.length)])
        } else {
          reject('Other Leg Rejection')
        }
      })
    })
  }
  const generateLegExercise = function(difficulty){
    return new Promise((resolve, reject)=>{
      db.getExerciseByMuscleAndDiff(4, difficulty)
      .then((exercises) => {
        if(exercises){
          resolve(exercises[Math.floor(Math.random() * exercises.length)])
        } else {
          reject('Leg Rejection')
        }
      })
    })
  }
  const generateBackArmExercise = function(difficulty){
    return new Promise((resolve, reject)=>{
      db.getExerciseByMuscleAndDiff(7, difficulty)
      .then((exercises) => {
        if(exercises){
          resolve(exercises[Math.floor(Math.random() * exercises.length)])
        } else {
          reject('Bicep rejection')
        }
      })
    })
  }
  const generateBackExercise = function(difficulty){
    return new Promise((resolve, reject)=>{
      db.getExerciseByMuscleAndDiff(8, difficulty)
      .then((exercises) => {
        if(exercises){
          resolve(exercises[Math.floor(Math.random() * exercises.length)])
        } else {
          reject('Back rejection')
        }
      })
    })
  }
  const generateChestExercise = function(difficulty){
    return new Promise ((resolve, reject)=>{
      db.getExerciseByMuscleAndDiff(6, difficulty)
      .then((exercises) => {
        if(exercises){
          resolve(exercises[Math.floor(Math.random() * exercises.length)])
        } else {
          reject('Chest Rejection')
        }
      })
    })
  }
  const generateCardioExercise = function (difficulty) {
    return new Promise((resolve, reject) => {
      db.getExerciseByMuscleAndDiff(1, difficulty)
        .then((exercises) => {
          if (exercises) {
            resolve(exercises[Math.floor(Math.random() * exercises.length)])
          } else {
            reject('Cardio Rejection')
          }
        })
    })
  }
  const generateTricepExercise = function(difficulty){
    return new Promise((resolve, reject)=>{
      db.getExerciseByMuscleAndDiff(5, difficulty)
      .then((exercises) => {
        if(exercises){
          resolve(exercises[Math.floor(Math.random() * exercises.length)])
        } else {
          reject('Tricep Rejection')
        }
      })
    })
  }
  const generateAbExercise = function(difficulty){
    return new Promise((resolve, reject)=>{
      db.getExerciseByMuscleAndDiff(2, difficulty)
      .then((exercises) => {
        if (exercises) {
          resolve(exercises[Math.floor(Math.random() * exercises.length)])
        } else {
          reject('Cardio Rejection')
        }
      })
    })
  }

module.exports = {

  test:()=>{
    return generateAbExercise(3)
    .catch(err=>console.error(err));
  },

  generateWorkoutLeg: function(difficulty, index, prev){
    if(index === 1){
      return Promise.all([
        generateQuadExercise(difficulty),
        db.getExerciseById(prev),
        generateQuadExercise(difficulty),
        generateQuadExercise(difficulty),
        generateLegExercise(difficulty),
        generateLegExercise(difficulty),
        generateAbExercise(difficulty),
        generateAbExercise(difficulty)
      ])
      .then(results => results.reduce((final, curr) => final.concat(curr), []))
      .catch((err) => {
        console.error(err)
      })
    } else if(index === 2){
      return Promise.all([
        generateQuadExercise(difficulty),
        generateQuadExercise(difficulty),
        db.getExerciseById(prev),
        generateQuadExercise(difficulty),
        generateLegExercise(difficulty),
        generateLegExercise(difficulty),
        generateAbExercise(difficulty),
        generateAbExercise(difficulty)
      ])
      .then(results => results.reduce((final, curr) => final.concat(curr), []))
      .catch((err) => {
        console.error(err)
      })
    }else if(index === 3){
      return Promise.all([
        generateQuadExercise(difficulty),
        generateQuadExercise(difficulty),
        generateQuadExercise(difficulty),
        db.getExerciseById(prev),
        generateLegExercise(difficulty),
        generateLegExercise(difficulty),
        generateAbExercise(difficulty),
        generateAbExercise(difficulty)
      ])
      .then(results => results.reduce((final, curr) => final.concat(curr), []))
      .catch((err) => {
        console.error(err)
      })
    }else if(index === 4){
      return Promise.all([
        generateQuadExercise(difficulty),
        generateQuadExercise(difficulty),
        generateQuadExercise(difficulty),
        generateLegExercise(difficulty),
        db.getExerciseById(prev),
        generateLegExercise(difficulty),
        generateAbExercise(difficulty),
        generateAbExercise(difficulty)
      ])
      .then(results => results.reduce((final, curr) => final.concat(curr), []))
      .catch((err) => {
        console.error(err)
      })
    }else if(index === 5){
      return Promise.all([
        generateQuadExercise(difficulty),
        generateQuadExercise(difficulty),
        generateQuadExercise(difficulty),
        generateLegExercise(difficulty),
        generateLegExercise(difficulty),
        db.getExerciseById(prev),
        generateAbExercise(difficulty),
        generateAbExercise(difficulty)
      ])
      .then(results => results.reduce((final, curr) => final.concat(curr), []))
      .catch((err) => {
        console.error(err)
      })
    }else if(index === 6){
      db.getExerciseById(prev)
      return Promise.all([
        generateQuadExercise(difficulty),
        generateQuadExercise(difficulty),
        generateQuadExercise(difficulty),
        generateLegExercise(difficulty),
        generateLegExercise(difficulty),
        generateAbExercise(difficulty),
        db.getExerciseById(prev),
        generateAbExercise(difficulty)
      ])
      .then(results => results.reduce((final, curr) => final.concat(curr), []))
      .catch((err) => {
        console.error(err)
      })
    }else if(index === 7){
      return Promise.all([
        generateQuadExercise(difficulty),
        generateQuadExercise(difficulty),
        generateQuadExercise(difficulty),
        generateLegExercise(difficulty),
        generateLegExercise(difficulty),
        generateAbExercise(difficulty),
        generateAbExercise(difficulty),
        db.getExerciseById(prev),
      ])
      .then(results => results.reduce((final, curr) => final.concat(curr), []))
      .catch((err) => {
        console.error(err)
      })
    } else {
      return Promise.all([
          generateQuadExercise(difficulty),
          generateQuadExercise(difficulty),
          generateQuadExercise(difficulty),
          generateQuadExercise(difficulty),
          generateLegExercise(difficulty),
          generateLegExercise(difficulty),
          generateAbExercise(difficulty),
          generateAbExercise(difficulty)
        ])
        .then(results => results.reduce((final, curr) => final.concat(curr), []))
        .catch((err) => {
          console.error(err)
        })
    }
  },

  generateWorkoutBack: function(difficulty, index, prev){
    if(!index){
      return Promise.all([
        generateBackExercise(difficulty),
        generateBackExercise(difficulty),
        generateBackExercise(difficulty),
        generateBackExercise(difficulty),
        generateBackArmExercise(difficulty),
        generateBackArmExercise(difficulty),
        generateAbExercise(difficulty),
        generateAbExercise(difficulty)
      ])
        .then(results => results.reduce((final, curr) => final.concat(curr), []))
        .catch((err) => {
          console.error(err)
        })
    } else if(index === 1){
      return Promise.all([
        generateBackExercise(difficulty),
        db.getExerciseById(prev),
        generateBackExercise(difficulty),
        generateBackExercise(difficulty),
        generateBackArmExercise(difficulty),
        generateBackArmExercise(difficulty),
        generateAbExercise(difficulty),
        generateAbExercise(difficulty)
      ])
        .then(results => results.reduce((final, curr) => final.concat(curr), []))
        .catch((err) => {
          console.error(err)
        })
    } else if(index ===2){
      return Promise.all([
        generateBackExercise(difficulty),
        generateBackExercise(difficulty),
        db.getExerciseById(prev),
        generateBackExercise(difficulty),
        generateBackArmExercise(difficulty),
        generateBackArmExercise(difficulty),
        generateAbExercise(difficulty),
        generateAbExercise(difficulty)
      ])
        .then(results => results.reduce((final, curr) => final.concat(curr), []))
        .catch((err) => {
          console.error(err)
        })
    } else if (index === 3){
      return Promise.all([
        generateBackExercise(difficulty),
        generateBackExercise(difficulty),
        generateBackExercise(difficulty),
        db.getExerciseById(prev),
        generateBackArmExercise(difficulty),
        generateBackArmExercise(difficulty),
        generateAbExercise(difficulty),
        generateAbExercise(difficulty)
      ])
        .then(results => results.reduce((final, curr) => final.concat(curr), []))
        .catch((err) => {
          console.error(err)
        })
    } else if (index === 4){
      return Promise.all([
        generateBackExercise(difficulty),
        generateBackExercise(difficulty),
        generateBackExercise(difficulty),
        generateBackArmExercise(difficulty),
        db.getExerciseById(prev),
        generateBackArmExercise(difficulty),
        generateAbExercise(difficulty),
        generateAbExercise(difficulty)
      ])
        .then(results => results.reduce((final, curr) => final.concat(curr), []))
        .catch((err) => {
          console.error(err)
        })
    } else if (index === 5){
      return Promise.all([
        generateBackExercise(difficulty),
        generateBackExercise(difficulty),
        generateBackExercise(difficulty),
        generateBackArmExercise(difficulty),
        generateBackArmExercise(difficulty),
        db.getExerciseById(prev),
        generateAbExercise(difficulty),
        generateAbExercise(difficulty)
      ])
        .then(results => results.reduce((final, curr) => final.concat(curr), []))
        .catch((err) => {
          console.error(err)
        })
    } else if (index === 6){
      return Promise.all([
        generateBackExercise(difficulty),
        generateBackExercise(difficulty),
        generateBackExercise(difficulty),
        generateBackArmExercise(difficulty),
        generateBackArmExercise(difficulty),
        generateAbExercise(difficulty),
        db.getExerciseById(prev),
        generateAbExercise(difficulty)
      ])
        .then(results => results.reduce((final, curr) => final.concat(curr), []))
        .catch((err) => {
          console.error(err)
        })
    } else if (index === 7){
      return Promise.all([
        generateBackExercise(difficulty),
        generateBackExercise(difficulty),
        generateBackExercise(difficulty),
        generateBackArmExercise(difficulty),
        generateBackArmExercise(difficulty),
        generateAbExercise(difficulty),
        generateAbExercise(difficulty),
        db.getExerciseById(prev)
      ])
        .then(results => results.reduce((final, curr) => final.concat(curr), []))
        .catch((err) => {
          console.error(err)
        })
    }
    
  },

  generateWorkoutChest: function(difficulty, index, prev){
    if(!index){
      return Promise.all([
        generateChestExercise(difficulty),
        generateChestExercise(difficulty),
        generateChestExercise(difficulty),
        generateChestExercise(difficulty),
        generateTricepExercise(difficulty),
        generateTricepExercise(difficulty),
        generateAbExercise(difficulty),
        generateAbExercise(difficulty)
      ])
      .then(results => results.reduce((final, curr) => final.concat(curr), []))
      .catch((err) => {
        console.error(err)
      })
    } else if (index === 1) {
      return Promise.all([
        generateChestExercise(difficulty),
        db.getExerciseById(prev),
        generateChestExercise(difficulty),
        generateChestExercise(difficulty),
        generateTricepExercise(difficulty),
        generateTricepExercise(difficulty),
        generateAbExercise(difficulty),
        generateAbExercise(difficulty)
      ])
      .then(results => results.reduce((final, curr) => final.concat(curr), []))
      .catch((err) => {
        console.error(err)
      })
    } else if (index === 2) {
      return Promise.all([
        generateChestExercise(difficulty),
        generateChestExercise(difficulty),
        db.getExerciseById(prev),
        generateChestExercise(difficulty),
        generateTricepExercise(difficulty),
        generateTricepExercise(difficulty),
        generateAbExercise(difficulty),
        generateAbExercise(difficulty)
      ])
      .then(results => results.reduce((final, curr) => final.concat(curr), []))
      .catch((err) => {
        console.error(err)
      })
    } else if (index === 3) {
      return Promise.all([
        generateChestExercise(difficulty),
        generateChestExercise(difficulty),
        generateChestExercise(difficulty),
        db.getExerciseById(prev),
        generateTricepExercise(difficulty),
        generateTricepExercise(difficulty),
        generateAbExercise(difficulty),
        generateAbExercise(difficulty)
      ])
      .then(results => results.reduce((final, curr) => final.concat(curr), []))
      .catch((err) => {
        console.error(err)
      })
    } else if (index === 4) {
      return Promise.all([
        generateChestExercise(difficulty),
        generateChestExercise(difficulty),
        generateChestExercise(difficulty),
        generateTricepExercise(difficulty),
        db.getExerciseById(prev),
        generateTricepExercise(difficulty),
        generateAbExercise(difficulty),
        generateAbExercise(difficulty)
      ])
      .then(results => results.reduce((final, curr) => final.concat(curr), []))
      .catch((err) => {
        console.error(err)
      })
    } else if (index === 5) {
      return Promise.all([
        generateChestExercise(difficulty),
        generateChestExercise(difficulty),
        generateChestExercise(difficulty),
        generateTricepExercise(difficulty),
        generateTricepExercise(difficulty),
        db.getExerciseById(prev),
        generateAbExercise(difficulty),
        generateAbExercise(difficulty)
      ])
      .then(results => results.reduce((final, curr) => final.concat(curr), []))
      .catch((err) => {
        console.error(err)
      })
    } else if (index === 6) {
      return Promise.all([
        generateChestExercise(difficulty),
        generateChestExercise(difficulty),
        generateChestExercise(difficulty),
        generateTricepExercise(difficulty),
        generateTricepExercise(difficulty),
        generateAbExercise(difficulty),
        db.getExerciseById(prev),
        generateAbExercise(difficulty)
      ])
      .then(results => results.reduce((final, curr) => final.concat(curr), []))
      .catch((err) => {
        console.error(err)
      })
    } else if (index === 7){
      return Promise.all([
        generateChestExercise(difficulty),
        generateChestExercise(difficulty),
        generateChestExercise(difficulty),
        generateTricepExercise(difficulty),
        generateTricepExercise(difficulty),
        generateAbExercise(difficulty),
        generateAbExercise(difficulty),
        db.getExerciseById(prev),
      ])
      .then(results => results.reduce((final, curr) => final.concat(curr), []))
      .catch((err) => {
        console.error(err)
      })
    }
  },

  generateWorkoutCardio: function(difficulty, index, prev){
  if (index === 1){
    return Promise.all([
      generateCardioExercise(difficulty),
      db.getExerciseById(prev),
      generateCardioExercise(difficulty),
      generateCardioExercise(difficulty),
      generateCardioExercise(difficulty),
      generateAbExercise(difficulty),
      generateAbExercise(difficulty),
      generateAbExercise(difficulty),
    ])
    .then(results => results.reduce((final, curr) => final.concat(curr), []))
    .catch(err => console.error(err)); 
  } else if( index === 2){
    return Promise.all([
      generateCardioExercise(difficulty),
      generateCardioExercise(difficulty),
      db.getExerciseById(prev),
      generateCardioExercise(difficulty),
      generateCardioExercise(difficulty),
      generateAbExercise(difficulty),
      generateAbExercise(difficulty),
      generateAbExercise(difficulty),
    ])
    .then(results => results.reduce((final, curr) => final.concat(curr), []))
    .catch(err => console.error(err));
    } else if(index === 3){
    return Promise.all([
      generateCardioExercise(difficulty),
      generateCardioExercise(difficulty),
      generateCardioExercise(difficulty),
      db.getExerciseById(prev),
      generateCardioExercise(difficulty),
      generateAbExercise(difficulty),
      generateAbExercise(difficulty),
      generateAbExercise(difficulty),
    ])
    .then(results => results.reduce((final, curr) => final.concat(curr), []))
    .catch(err => console.error(err));
    } else if (index === 4){
    return Promise.all([
      generateCardioExercise(difficulty),
      generateCardioExercise(difficulty),
      generateCardioExercise(difficulty),
      generateCardioExercise(difficulty),
      db.getExerciseById(prev),
      generateAbExercise(difficulty),
      generateAbExercise(difficulty),
      generateAbExercise(difficulty),
    ])
    .then(results => results.reduce((final, curr) => final.concat(curr), []))
    .catch(err => console.error(err));
    } else if (index === 5){
    return Promise.all([
        generateCardioExercise(difficulty),
        generateCardioExercise(difficulty),
        generateCardioExercise(difficulty),
        generateCardioExercise(difficulty),
        generateAbExercise(difficulty),
        db.getExerciseById(prev),
        generateAbExercise(difficulty),
        generateAbExercise(difficulty),
      ])
      .then(results => results.reduce((final, curr) => final.concat(curr), []))
      .catch(err => console.error(err));
    } else if (index === 6){
      db.getExerciseById(prev)
    return Promise.all([
      generateCardioExercise(difficulty),
      generateCardioExercise(difficulty),
      generateCardioExercise(difficulty),
      generateCardioExercise(difficulty),
      generateAbExercise(difficulty),
      generateAbExercise(difficulty),
      db.getExerciseById(prev),
      generateAbExercise(difficulty),
    ])
    .then(results => results.reduce((final, curr) => final.concat(curr), []))
    .catch(err => console.error(err));
    } else if ( index === 7){
    return Promise.all([
      generateCardioExercise(difficulty),
      generateCardioExercise(difficulty),
      generateCardioExercise(difficulty),
      generateCardioExercise(difficulty),
      generateAbExercise(difficulty),
      generateAbExercise(difficulty),
      generateAbExercise(difficulty),
      db.getExerciseById(prev),
    ])
    .then(results => results.reduce((final, curr) => final.concat(curr), []))
    .catch(err => console.error(err));
    } else {
      return Promise.all([
          generateCardioExercise(difficulty),
          generateCardioExercise(difficulty),
          generateCardioExercise(difficulty),
          generateCardioExercise(difficulty),
          generateCardioExercise(difficulty),
          generateAbExercise(difficulty),
          generateAbExercise(difficulty),
          generateAbExercise(difficulty),
        ])
        .then(results => results.reduce((final, curr) => final.concat(curr), []))
        .catch(err => console.error(err));
  }
},
  generateWorkout: function(wo_num, difficulty, prev, index){
    return new Promise((resolve, reject)=>{
      let solution;
      if (wo_num === 0 || wo_num % 6 === 0) {
        this.generateWorkoutChest(difficulty, index, prev)
        .then(wo => {
          solution = wo
          if (solution) {
            resolve(solution)
          } else {
            reject('Error Fetching Workout')
          }
        })
        .catch(err=>console.error(err))
      } else if (wo_num % 2 === 1) {
        this.generateWorkoutCardio(difficulty, index, prev)
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
        this.generateWorkoutLeg(difficulty, index, prev)
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
        this.generateWorkoutBack(difficulty, index, prev)
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
 
function otherCardio(difficulty, index, prev){
  return new Promise((resolve, reject) => {
    let solution = [];
    let i = 0;
    while (i < 8) {
      if (i !== index && i > 4) {
        generateAbExercise(difficulty).then(ex => {
          solution.push(ex)
          if (solution.length === 8) {
            resolve(solution)
          }
        })
      } else if (i !== index) {
        generateCardioExercise(difficulty).then(ex => {
          solution.push(ex)
          if (solution.length === 8) {
            resolve(solution)
          }
        })
      } else {
        db.getExerciseById(prev).then(ex => {
          solution.push(ex)
          if (solution.length === 8) {
            resolve(solution)
          }
        })
      }
      i++;
    }
  })
}