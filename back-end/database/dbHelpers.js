// require pg-promise
const pgp = require('pg-promise')();
//require the config js to get the libPass
const { libPass } = require('../../config');

const connection = {
  host: 'pellefant.db.elephantsql.com', // server name or IP address;
  port: 5432,
  database: 'jeunwozz',
  user: 'jeunwozz',
  password: libPass,
};
const db = pgp(connection);

module.exports = {

  getExerciseIndex: (email) => db.any(`
  SELECT current_workout_index FROM users
  WHERE user_email = $1
  `, [email]),

  getExerciseDescription: (exerciseId) => db.any(`
  SELECT description FROM exercises
  WHERE id = $1
  `, [exerciseId]).then(([exercise]) => exercise),
  
  getUserInfoByGoogleSessionId: (sessionId) => db.any(`
  SELECT * FROM users
  WHERE google_session_id = $1
  `, [sessionId]).then(([user]) => user),

  getUserInfoByAlexUserId: (alexaId) => db.any(`
  SELECT * FROM users
  WHERE alexa_user_id = $1
  `, [alexaId]).then(([user]) => user),
  
  // get user information
  getUserInfoByName: (username) => db.any(`
    SELECT * FROM users
    WHERE preferred_username = $1
  `, [username]).then(([user])=> user),

  //get password to authenticate
  getPasswordByEmail: (email)=> db.any(`
    SELECT password FROM users
    WHERE user_email = $1
  `, [email]).then(([password])=> password), 

  getUserInfoByEmail: (email) => db.any(`
    SELECT * FROM users
    WHERE user_email = $1
  `, [email]).then(([user]) => user),

  // gets the user dietary information based on the user id
  getUserDietByUserId: (userId) => db.any(`
    SELECT name, type FROM dietary_restrictions 
    INNER JOIN user_dietary ON (dietary_restrictions.id = user_dietary.id_dietary_restrictions 
    AND user_dietary.id_user = $1)
    `, [userId]).then(([userDiet]) => userDiet),

  getWeatherImages: (text, time) => db.any(`
    SELECT url FROM weather_images
    WHERE weather = $1 AND time_of_day = $2 
  `, [text, time]).then(([weatherImages]) => weatherImages),
  // need to get the exercises
  
  getExerciseByMuscleAndDiff: (muscleId, difficulty) => db.any(`
    SELECT * FROM exercises
    WHERE id_muscle_group = $1 AND difficulty < $2
    `, [muscleId, difficulty + 1]),

  // realized we may need to grab the exercises by their id as well
  getExerciseById: (exerciseId) => db.any(`
    SELECT * FROM exercises
    WHERE id = $1
  `, [exerciseId]).then(([exercise]) => exercise),
  
  getDietaryRestrictionsIdByName: (name) => db.any(`
    SELECT id FROM dietary_restrictions
    WHERE name = $1
    `, [name]).then(([dietRestrictions]) => dietRestrictions),

  // need to grab the youtube link for the youtube api
  getYoutubeLink: (name) => db.any(`
    SELECT youtube_link FROM exercises
    WHERE name = $1
  `, [name]).then(([link]) => link),

  getCompletedWorkoutDates: (userId) => db.any(`
    SELECT * FROM workout_date
    WHERE id_user = $1 AND completed = true
  `, [userId]),

  getPartialWorkoutDates: (userId) => db.any(`
    SELECT * FROM workout_date
    WHERE id_user = $1 AND completed = false
  `, [userId]),

  getUserById: (userId) => db.any(`
    SELECT * FROM users
    WHERE id = $1
  `, [userId]).then(([user]) => user),

  getUserIdByEmail: (email) => db.any(`
    SELECT id FROM users
    WHERE user_email = $1
  `, [email]).then(([id]) => id),

  
  addNewUser: (weight, numPushUps, jogDist, age, sex, height, squatComf, goals, email, preferredUsername, password) => db.any(`
    INSERT INTO users 
    (weight, num_push_ups, jog_dist, age, sex, height, squat_comf, workout_completes, goals, user_email, preferred_username, password)
    VALUES
    ($1, $2, $3, $4, $5, $6, $7, 0, $8, $9, $10, $11)
  `, [weight, numPushUps, jogDist, age, sex, height, squatComf, goals, email, preferredUsername, password]),


  // will most likely need to call this within a loop over the different diet ids
  insertIntoUserDiet: (userId, dietId) => db.any(`
    INSERT INTO user_dietary
    (id_user, id_dietary_restrictions)
    VALUES
    ($1, $2)
  `, [userId, dietId]),

  insertIntoWorkouts: (userId, date, isCompleted) => db.any(`
    INSERT INTO workout_date
    (id_user, date, completed)
    VALUES
    ($1, $2, $3)
  `, [exerciseId, userId, isCompleted]),

  updateNoWO: (user_id, newWONum)=> db.any(`
      UPDATE users
      SET workout_completes = $2
      WHERE id = $1
  `, [user_id, newWONum]),

  updateWOIndex: (userID, index) => db.any(`
    UPDATE users
    SET 
    current_workout_index = $2
    WHERE id = $1
  `, [userID, index]),


  updateLastWO: (userID, last)=> db.any(`
      UPDATE users
      SET
      last_exercise_id = $2
      WHERE id = $1
  `, [userID, last]),
  
  updateGoogleSessionIdForUser: (username, sessionId) => db.any(`
  UPDATE users
  SET
  google_session_id = $2
  WHERE
  preferred_username = $1
  `,[username, sessionId]),
  
  updateAlexaId: (email, alexaId) => db.any(`
  UPDATE users
  SET
  alexa_user_id = $2
  WHERE
  user_email = $1
  `, [email, alexaId]),

  undoUserDietaryRestrictionByIds: (userId, dietId) => db.any(`
    DELETE FROM user_dietary
    WHERE id_user = $1 AND id_dietary_restrictions = $2
  `, [userId, dietId]),
  
  removeUserByEmail: (userEmail) => db.any(`
    DELETE FROM users
    WHERE user_email = $1
  `, [userEmail]),

};