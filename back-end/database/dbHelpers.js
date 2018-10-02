// require pg-promise
const pgp = require('pg-promise')();
//require the config js to get the libPass
const { libPass } = require('../config');

const connection = {
  host: 'pellefant.db.elephantsql.com', // server name or IP address;
  port: 5432,
  database: 'jeunwozz',
  user: 'jeunwozz',
  password: libPass,
};

const db = pgp(connection);

module.exports = {
  // get user information
  getUserInfoByName: (username) => db.any(`
    SELECT * FROM users
    WHERE name = $1
  `, [username]),

  // gets the user dietary information based on the user id
  getUserDietByUserId: (userId) => db.any(`
    SELECT name, type FROM dietary_restrictions 
    INNER JOIN user_dietary ON (dietary_restrictions.id = user_dietary.id_dietary_restrictions 
    AND user_dietary.id_user = $1)
    `, [userId]),

  // need to get the exercises
  getExerciseByMuscleAndDiff: (muscleId, difficulty) => db.any(`
    SELECT * FROM exercises
    WHERE id_muscle_group = $1 AND difficulty < $2
    `, [muscleId, difficulty + 1]),

  // need to get the completed exercises first cardio then i will do str will be basically the same
  getCompCardioByUserId: (userId) => db.any(`
    SELECT * FROM completed_cardio
    WHERE id_user = $1
  `, [userId]),

  getCompStrByUserId: (userId) => db.any(`
    SELECT * FROM completed_str
    WHERE id_user = $1
  `, [userId]),

  // realized we may need to grab the exercises by their id as well
  getExerciseById: (exerciseId) => db.any(`
    SELECT * FROM exercises
    WHERE id = $1
  `, [exerciseId]),

  getUserById: (userId) => db.any(`
    SELECT * FROM users
    WHERE id = $1
  `, [userId]),

  getExercisesFromExerciseWorkoutsByUserId: (userId) => db.any(`
    SELECT exercises FROM exercises_workouts
    WHERE id_user = $1
  `, [userId]),

  insertIntoExerciseWorkoutsByUserIdAndArrayOfJson: (userId, arrayOfJson) => db.any(`
    INSERT INTO exercises_workouts (id_user, exercises) VALUES ( $1, array $2 ::json[])
  `, [userId, arrayOfJson]),

  addNewUser: (name, weight, numPushUps, jogDist, age, sex, height, squatComf, goals) => db.any(`
    INSERT INTO users 
    (name, weight, num_push_ups, jog_dist, age, sex, height, squat_comf, all_sets, workout_completes, goals)
    VALUES
    ($1, $2, $3, $4, $5, $6, $7, $8, 0, 0, $9)
  `, [name, weight, numPushUps, jogDist, age, sex, height, squatComf, goals]),

  getDietaryRestrictionsIdByName: (name) => db.any(`
    SELECT id FROM dietary_restrictions
    WHERE name = $1
  `, [name]),
  
  // will most likely need to call this within a loop over the different diet ids
  insertIntoUserDiet: (userId, dietId) => db.any(`
    INSERT INTO user_dietary
    (id_user, id_dietary_restrictions)
    VALUES
    ($1, $2)
  `, [userId, dietId]),

  insertIntoCompStr: (exerciseId, userId, reps, completed, date) => db.any(`
    INSERT INTO completed_str
    (id_exercise, id_user, reps, completed, date)
    VALUES
    ($!, $2, $3, $4, $5)
  `, [exerciseId, userId, reps, completed, date]),

  insertIntoCompCardio: (userId, exerciseId, date, lastTotalTime, bpm, distance, completed) => db.any(`
    INSERT INTO completed_cardio
    (id_user, id_exercise, date, last_tot_time, avg_bpm, distance, completed)
    VALUES
    ($1, $2, $3, $4, $5, $6, $7)
  `, [userId, exerciseId, date, lastTotalTime, bpm, distance, completed]),

  updateCompCardio: (completed, userId, date, lastTotalTime, bpm) => db.any(`
    UPDATE completed_cardio
    SET
    completed = $1
    date = $3
    last_tot_time = $4
    avg_bpm = $5
    WHERE
    id_user = $2
  `, [completed, userId, date, lastTotalTime, bpm]),

  // need to grab the youtube link for the youtube api
  getYoutubeLink: (name) => db.any(`
    SELECT youtube_link FROM exercises
    WHERE name = $1
  `, [name]),

  updateCompStr: (completed, userId, date, reps) => db.any(`
    UPDATE completed_str
    SET
    completed = $1
    date = $3
    reps = $4
    WHERE
    id_user = $2
  `, [completed, userId, date, reps]),

  undoUserDietaryRestrictionByIds: (userId, dietId) => db.any(`
    DELETE FROM user_dietary
    WHERE id_user = $1 AND id_dietary_restrictions = $2
  `, [userId, dietId]),

  removeUserWorkout: (userId) => db.any(`
    DELETE FROM exercises_workouts
    WHERE id_user = $1
  `, [userId]),
};