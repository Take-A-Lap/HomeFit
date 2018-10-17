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

  generateWorkoutLeg: function(difficulty){
    let x; 
    if(index === 1){
      db.getExerciseById(prev)
      .then(ex=>{
        x = ex;
        return Promise.all([
          generateQuadExercise(difficulty),
          generateQuadExercise(difficulty),
          generateQuadExercise(difficulty),
          generateLegExercise(difficulty),
          generateLegExercise(difficulty),
          generateAbExercise(difficulty),
          generateAbExercise(difficulty)
        ])
        .then(results => results.reduce((final, curr) => final.concat(curr), [x]))
        .catch((err) => {
          console.error(err)
        })
      })
    } else if(index === 2){
      db.getExerciseById(prev)
      .then(ex => {
        x = ex;
        return Promise.all([
        generateQuadExercise(difficulty),
        generateQuadExercise(difficulty),
        generateLegExercise(difficulty),
        generateLegExercise(difficulty),
        generateAbExercise(difficulty),
        generateAbExercise(difficulty)
      ])
      .then(results => results.reduce((final, curr) => final.concat(curr), [x]))
      .catch((err) => {
        console.error(err)
      })
  })
    }else if(index === 3){
      db.getExerciseById(prev)
      .then(ex=>{
        x = ex;
        return Promise.all([
          generateQuadExercise(difficulty),
          generateLegExercise(difficulty),
          generateLegExercise(difficulty),
          generateAbExercise(difficulty),
          generateAbExercise(difficulty)
        ])
        .then(results => results.reduce((final, curr) => final.concat(curr), [x]))
        .catch((err) => {
          console.error(err)
        })
      })
    }else if(index === 4){
      db.getExerciseById(prev)
      .then(ex=>{
        return Promise.all([
          generateLegExercise(difficulty),
          generateLegExercise(difficulty),
          generateAbExercise(difficulty),
          generateAbExercise(difficulty)
        ])
        .then(results => results.reduce((final, curr) => final.concat(curr), [ex]))
        .catch((err) => {
          console.error(err)
        })
      })
    }else if(index === 5){
      db.getExerciseById(prev)
      .then(ex=>{
        return Promise.all([
          generateLegExercise(difficulty),
          generateAbExercise(difficulty),
          generateAbExercise(difficulty)
        ])
        .then(results => results.reduce((final, curr) => final.concat(curr), [ex]))
        .catch((err) => {
          console.error(err)
        })
      })
    }else if(index === 6){
      db.getExerciseById(prev)
      .then(ex=>{
        return Promise.all([
          generateAbExercise(difficulty),
          generateAbExercise(difficulty)
        ])
        .then(results => results.reduce((final, curr) => final.concat(curr), [ex]))
        .catch((err) => {
          console.error(err)
        })
      })

    }else if(index === 7){
      db.getExerciseById(prev)
      .then(ex=>{
        return Promise.all([
          generateAbExercise(difficulty)
        ])
        .then(results => results.reduce((final, curr) => final.concat(curr), [ex]))
        .catch((err) => {
          console.error(err)
        })
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

  generateWorkoutBack: function(difficulty){
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
      ds.getExerciseById(prev)
      .then(ex=>{
        return Promise.all([
          generateBackExercise(difficulty),
          generateBackExercise(difficulty),
          generateBackExercise(difficulty),
          generateBackArmExercise(difficulty),
          generateBackArmExercise(difficulty),
          generateAbExercise(difficulty),
          generateAbExercise(difficulty)
        ])
        .then(results => results.reduce((final, curr) => final.concat(curr), [ex]))
        .catch((err) => {
          console.error(err)
        })
      })
    } else if(index ===2){
      ds.getExerciseById(prev)
      .then(ex=>{
        return Promise.all([
          generateBackExercise(difficulty),
          generateBackExercise(difficulty),
          generateBackArmExercise(difficulty),
          generateBackArmExercise(difficulty),
          generateAbExercise(difficulty),
          generateAbExercise(difficulty)
        ])
        .then(results => results.reduce((final, curr) => final.concat(curr), [ex]))
        .catch((err) => {
          console.error(err)
        })
      })
    } else if (index === 3){
      ds.getExerciseById(prev)
      .then(ex=>{
        return Promise.all([
          generateBackExercise(difficulty),
          generateBackArmExercise(difficulty),
          generateBackArmExercise(difficulty),
          generateAbExercise(difficulty),
          generateAbExercise(difficulty)
        ])
        .then(results => results.reduce((final, curr) => final.concat(curr), [ex]))
        .catch((err) => {
          console.error(err)
        })
      })
    } else if (index === 4){
      ds.getExerciseById(prev)
      .then(ex=>{
        return Promise.all([
          generateBackArmExercise(difficulty),
          generateBackArmExercise(difficulty),
          generateAbExercise(difficulty),
          generateAbExercise(difficulty)
        ])
        .then(results => results.reduce((final, curr) => final.concat(curr), [ex]))
        .catch((err) => {
          console.error(err)
        })
      })
    } else if (index === 5){
      ds.getExerciseById(prev)
      .then(ex=>{
        return Promise.all([
          generateBackArmExercise(difficulty),
          generateAbExercise(difficulty),
          generateAbExercise(difficulty)
        ])
        .then(results => results.reduce((final, curr) => final.concat(curr), [ex]))
        .catch((err) => {
          console.error(err)
        })
      })
    } else if (index === 6){
      ds.getExerciseById(prev)
      .then(ex=>{
        return Promise.all([
          generateAbExercise(difficulty),
          generateAbExercise(difficulty)
        ])
        .then(results => results.reduce((final, curr) => final.concat(curr), [ex]))
        .catch((err) => {
          console.error(err)
        })
      })
    } else if (index === 7){
      ds.getExerciseById(prev)
      .then(ex=>{
        return Promise.all([
          generateAbExercise(difficulty)
        ])
        .then(results => results.reduce((final, curr) => final.concat(curr), [ex]))
        .catch((err) => {
          console.error(err)
        })
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
      db.getExerciseById(prev)
      .then(ex=>{
        return Promise.all([
          generateChestExercise(difficulty),
          generateChestExercise(difficulty),
          generateChestExercise(difficulty),
          generateTricepExercise(difficulty),
          generateTricepExercise(difficulty),
          generateAbExercise(difficulty),
          generateAbExercise(difficulty)
        ])
        .then(results => results.reduce((final, curr) => final.concat(curr), [ex]))
        .catch((err) => {
          console.error(err)
        })
      })
    } else if (index === 2) {
      db.getExerciseById(prev)
      .then(ex=>{
        return Promise.all([
          generateChestExercise(difficulty),
          generateChestExercise(difficulty),
          generateTricepExercise(difficulty),
          generateTricepExercise(difficulty),
          generateAbExercise(difficulty),
          generateAbExercise(difficulty)
        ])
        .then(results => results.reduce((final, curr) => final.concat(curr), [ex]))
        .catch((err) => {
          console.error(err)
        })
      })
    } else if (index === 3) {
      db.getExerciseById(prev)
      .then(ex=>{
        return Promise.all([
          generateChestExercise(difficulty),
          generateTricepExercise(difficulty),
          generateTricepExercise(difficulty),
          generateAbExercise(difficulty),
          generateAbExercise(difficulty)
        ])
        .then(results => results.reduce((final, curr) => final.concat(curr), [ex]))
        .catch((err) => {
          console.error(err)
        })
      })
    } else if (index === 4) {
      db.getExerciseById(prev)
      .then(ex=>{
        return Promise.all([
          generateTricepExercise(difficulty),
          generateTricepExercise(difficulty),
          generateAbExercise(difficulty),
          generateAbExercise(difficulty)
        ])
        .then(results => results.reduce((final, curr) => final.concat(curr), [ex]))
        .catch((err) => {
          console.error(err)
        })
      })
    } else if (index === 5) {
      db.getExerciseById(prev)
      .then(ex=>{
        return Promise.all([
          generateTricepExercise(difficulty),
          generateAbExercise(difficulty),
          generateAbExercise(difficulty)
        ])
        .then(results => results.reduce((final, curr) => final.concat(curr), [ex]))
        .catch((err) => {
          console.error(err)
        })
      })
    } else if (index === 6) {
      db.getExerciseById(prev)
      .then(ex=>{
        return Promise.all([
          generateAbExercise(difficulty),
          generateAbExercise(difficulty)
        ])
        .then(results => results.reduce((final, curr) => final.concat(curr), [ex]))
        .catch((err) => {
          console.error(err)
        })
      })

    } else if (index === 7){
      db.getExerciseById(prev)
      .then(ex=>{
        return Promise.all([
          generateAbExercise(difficulty)
        ])
        .then(results => results.reduce((final, curr) => final.concat(curr), [ex]))
        .catch((err) => {
          console.error(err)
        })
      })
    }  
  },

  generateWorkoutCardio: function(difficulty, index, prev){
   
  if (index === 1){
      db.getExerciseById(prev)
      .then(ex=>{
        return Promise.all([
          generateCardioExercise(difficulty),
          generateCardioExercise(difficulty),
          generateCardioExercise(difficulty),
          generateAbExercise(difficulty),
          generateAbExercise(difficulty),
          generateAbExercise(difficulty),
        ])
          .then(results => results.reduce((final, curr) => final.concat(curr), [ex]))
          .catch(err => console.error(err));
      }) 
    } else if( index === 2){
      db.getExerciseById(prev)
      .then(ex=>{
        return Promise.all([
          generateCardioExercise(difficulty),
          generateCardioExercise(difficulty),
          generateAbExercise(difficulty),
          generateAbExercise(difficulty),
          generateAbExercise(difficulty),
        ])
          .then(results => results.reduce((final, curr) => final.concat(curr), [ex]))
          .catch(err => console.error(err));
      }) 
    } else if(index === 3){
      db.getExerciseById(prev)
      .then(ex=>{
        return Promise.all([
          generateCardioExercise(difficulty),
          generateCardioExercise(difficulty),
          generateAbExercise(difficulty),
          generateAbExercise(difficulty),
          generateAbExercise(difficulty),
        ])
          .then(results => results.reduce((final, curr) => final.concat(curr), [ex]))
          .catch(err => console.error(err));
      }) 
    } else if (index === 4){
      db.getExerciseById(prev)
      .then(ex=>{
        return Promise.all([
          generateCardioExercise(difficulty),
          generateAbExercise(difficulty),
          generateAbExercise(difficulty),
          generateAbExercise(difficulty),
        ])
          .then(results => results.reduce((final, curr) => final.concat(curr), [ex]))
          .catch(err => console.error(err));
      }) 
    } else if (index === 5){
      db.getExerciseById(prev)
      .then(ex=>{
        return Promise.all([
          generateAbExercise(difficulty),
          generateAbExercise(difficulty),
          generateAbExercise(difficulty),
        ])
          .then(results => results.reduce((final, curr) => final.concat(curr), [ex]))
          .catch(err => console.error(err));
      }) 
    } else if (index === 6){
      db.getExerciseById(prev)
      .then(ex=>{
        return Promise.all([
          generateAbExercise(difficulty),
          generateAbExercise(difficulty),
        ])
          .then(results => results.reduce((final, curr) => final.concat(curr), [ex]))
          .catch(err => console.error(err));
      }) 
    } else if ( index === 7){
      db.getExerciseById(prev)
      .then(ex=>{
        return Promise.all([
          generateAbExercise(difficulty),
        ])
          .then(results => results.reduce((final, curr) => final.concat(curr), [ex]))
          .catch(err => console.error(err));
      }) 
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