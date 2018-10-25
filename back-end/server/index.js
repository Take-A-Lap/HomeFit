const express = require('express');
const bodyParser = require('body-parser');
const bluebird = require ('bluebird')
const verifier = require('alexa-verifier-middleware');
const db = require('../database/dbHelpers');
const alexaHelp = require('../alexaHelpers/helpers');
const weather = require('../weather/weatherHelpers');
const app = express()
const meal = bluebird.promisifyAll(require('../Algorithms/recipe.js'));
const workout = require('../Algorithms/workout.js');
const sse = require('../../sse');
const fs = require('fs');
const google = require('../googleAssHelpers/helpers');
const bcrypt = require('bcrypt');
const alexaRouter = express.Router()

app.use('/alexa', alexaRouter);
app.use(express.static('dist/HomeFit'));

alexaRouter.use(verifier)
alexaRouter.use(bodyParser.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

  let alexaWorkout = [];
  let sets = 0;
  let current;

app.post('/fulfillment', google);

app.post('/diet', (req,res)=>{
  let restrictions = req.body.params.restrictions;
  let user = JSON.parse(req.body.params.user);
  
  db.getUserDietByUserId(user.id)
  .then(diet=>{
    let userDiet = {};
    diet.forEach(restriction=>{
      userDiet[restriction.name]=true;
    })
    return userDiet;
  })
  .then(diet=>{
    restrictions.forEach(restriction=>{
      if(diet[restriction]){
        diet[restriction] = false;
        db.getDietaryRestrictionsIdByName(restriction)
        .then(id=>{
          db.undoUserDietaryRestrictionByIds(user.id,id.id)
        })
      } else {
        diet[restriction] = true;
      }
    })   
    return diet
  })
  .then(diet=>{
    const solution = [];
    for(var key in diet){
      if(diet[key]){
        solution.push(key)
      }
    }
    return solution;
  })
  .then(solution=>{
    solution.forEach(noNo=>{
      db.getDietaryRestrictionsIdByName(noNo)
      .then(result=>{
        db.insertIntoUserDiet(user.id, parseInt(result.id))
      })
    })
  })
  .catch(err=>console.error(err))
  res.send('coming from server')
})
app.post('/logout', (req, res)=>{
  console.log(JSON.parse(req.body.params.user).id)
  db.updateSessionOfUserById(JSON.parse(req.body.params.user).id, false)
  .then(()=>res.send('You have been logged out'))
  .catch(err=>console.error(err))
})
app.post('/login', (req,res)=>{
  const user = JSON.parse(req.body.params.user)
  db.updateSessionOfUserById(user.id, true)
  .then(() => res.send('You have been logged in'))
  .catch(err => console.error(err))
})

app.get('/generateWO', (req, res)=> {
  wo_num = req.query.wo_num;
  diff = req.query.diff;
  prev = req.query.previous;
  index = req.query.wo_index;
    workout.generateWorkout(wo_num, diff, prev, index)
    .then(workout=>{
      res.send(workout)
    })
    .catch(err=>console.error(err));
})

app.get('/test', (req, res)=>{
  meal.testGet()
  .then(recipes=>res.send(recipes))
  .catch(err=>console.error(err))
})

app.get('/getUser', (req, res) => {
  db.getUserInfoByEmail(req.query.email)
  .then((id)=>{
    res.send(id)})
  .catch(err=>console.error(err));
})

app.post('/inProgress', (req, res)=>{
  db.updateWOIndex(req.body.params.id, req.body.params.index)
  db.updateLastWO(req.body.params.id, req.body.params.ex_id)
})

app.get('/getUserId', (req, res) => {
  db.getUserIdByEmail( req.query.email)
    .then((id) => res.send(id))
    .catch(err => console.error(err));
})

app.get('/getUser', (req, res) => {
  db.getUserInfoByEmail(req.query.email)
    .then((id)=>res.send(id))
    .catch(err=>console.error(err));
})

app.get('/getCompletedWO', (req, res) => {
  db.getUserInfoByEmail(req.query.email)
    .then((userInfo)=> {
      return userInfo;
    })
    .then(({ id }) => {
      // use the id to query the completed str and cardio tables
      return db.getCompletedWorkoutDates(id)
    })
    .then(compStr => {
      if (compStr) {
        const result = compStr
          .map(wo => wo.date.getDate())
          .filter((date, i, a) => a.indexOf(date) === i);
        res.send(result);
      }
    })
    .catch(err=>console.error(err));
});

app.get('/homeFitAuth', (req, res) => {
  db.getUserInfoByEmail(req.query.email)
  .then(user=> {
    bcrypt.compare(req.query.password, user.password, (err, result) => {
      if (err) {
        console.error(err);
      } else {
        db.updateSessionOfUserById(user.id, true)
        res.send(result);
      }
    })
  })
})

app.post('/completed', (req, res)=> {
  var d = new Date();
  db.insertIntoWorkouts(req.body.params.id, d, true)
  .then(()=>res.send('tallied!'))
})

app.post('/update', (req, res)=>{
  let weight = req.body.params.weight;
  let numPushUps = req.body.params.push_ups;
  let jogDist = req.body.params.miles;
  let age = req.body.params.age;
  let squatComf = req.body.params.squats;
  let goals  = req.body.params.goals;
  let username = req.body.params.userName;
  let id = req.body.params.id;
  db.updateUser(weight,numPushUps,jogDist,age,squatComf,goals,username,id)
  .then(()=>res.end())
})

app.post('/updateWorkouts', (req, res)=>{
  db.updateNoWO(req.body.params.id, req.body.params.value)
  .then(()=>res.send('workouts updated'))
})

app.post('/weather', (req, res) => {
  let weatherInfo = {};
  Promise.all([
      weather.getWeatherDarkSky(req.body.params.latitude, req.body.params.longitude),
      weather.createDayNightLabel(req.body.params.timeStamp),
      weather.getCityNameForWeatherInfo(req.body.params.latitude, req.body.params.longitude)
    ])
    .then((response) => {
      weatherInfo.text = response[0].summary;
      weatherInfo.temp = response[0].temperature;
      weatherInfo.apparentTemp = response[0].apparentTemperature;
      weatherInfo.humidity = response[0].humidity,
      weatherInfo.icon = response[0].icon
      weatherInfo.time_of_day = response[1];
      weatherInfo.city = response[2].City;
      weatherInfo.state = response[2].State;
      weatherInfo.country = response[2].Country;
      console.log(weatherInfo)
    })
    .then(() => {
      return weather.runningRecommendations(weatherInfo)
    })
    .then(data => {
      weatherInfo.recommendation = data
    })
    .then(() => db.getWeatherImages(weatherInfo.text, weatherInfo.time_of_day))
    .then(result => {
      weatherInfo.url = result.url
    })
    .then(() => {
      res.send(weatherInfo)
    })
    .catch((err) => console.error(err /*'Good luck finding that error, bitch'*/ ))
  })


  //get request to db to retrieve username
app.get('/username', (req, res) => {
    db.getUserInfoByEmail(req.query.user)
      .then((user) => res.send(user))
  })

app.get('/dinner', (req,res)=>{
  const user = JSON.parse(req.query.user)
  const cal = JSON.parse(req.query.calorieProfile)
  db.getUserDietByUserId(user.id)
  .then(diet => meal.getDinner(cal.lunchMin, cal.lunchMax, diet))
  .then(recipes=> recipes.map(recipe=>recipe.recipe))
  .then(dinner=>res.send(dinner))
  .catch(err=>console.error(err));
})

app.get('/lunch', (req,res) => {
  const cal = JSON.parse(req.query.calorieProfile)
  meal.getLunch(cal.lunchMin, cal.lunchMax, '')
    .then(recipes => recipes.map(recipe => recipe.recipe))
    .then(lunch=>res.send(lunch))
    .catch(err => console.error(err))
})

app.get('/breakfast', (req, res) => {
  const cal = JSON.parse(req.query.calorieProfile)
  meal.getBreakfast(cal.lunchMin, cal.lunchMax, '')
    .then(recipes => recipes.map(recipe => recipe.recipe))
    .then(dinner => res.send(dinner))
    .catch(err => console.error(err));
})

app.post('/signUp', (req, res) =>{
  let weight = req.body.params.weight;
  let numPushUps = req.body.params.push_ups;
  let jogDist = req.body.params.miles;
  let age = req.body.params.age;
  let sex = req.body.params.sex;
  let height = req.body.params.height;
  let squatComf = req.body.params.squats;
  let goals  = req.body.params.goals;
  let email  = req.body.params.email;
  let username = req.body.params.userName;
  let password = req.body.params.password;
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(password, salt, (err, hash)=> {
      db.addNewUser(weight, numPushUps, jogDist, age, sex, height, squatComf, goals, username, email, hash)
        .then(()=>{
          return db.getUserInfoByEmail(email)
        })
        .then(user=>{
          db.updateSessionOfUserById(user.id, true)
          return user;
        })
        .catch(err=>console.error(err));
    res.end();
    });
  });
})

alexaRouter.post('/fitnessTrainer', (req, res) => {
  if (req.body.request.type === 'LaunchRequest') {
    db.getUserInfoByAlexUserId(req.body.session.user.userId)
      .then((user) => {
        const passingName = (user !== undefined ? user.preferred_username : "not linked yet");
        res.json(alexaHelp.invocationIntent(passingName));
      })
      .catch(err => {
        console.error(err);
        res.json(alexaHelp.PLACEHOLDER());
      });
  } else if (req.body.request.type === 'SessionEndedRequest') {
    res.json(alexaHelp.endSession());
  } else if (req.body.request.type === 'IntentRequest') {
    switch (req.body.request.intent.name) {
      case 'AMAZON.CancelIntent':
        res.json(alexaHelp.stopAndExit());
        break;
      case 'AMAZON.StopIntent':
        res.json(alexaHelp.stopAndExit());
        break;
      case 'initWorkout':
        //do some stuff
        db.getUserInfoByAlexUserId(req.body.session.user.userId)
          .then(user => {
            const squatComf = user.squat_comf;
            const numWorkouts = user.workout_completes;
            return workout.generateWorkout(numWorkouts, squatComf)
          })
          .then(genWorkout => {
            if(alexaWorkout.length === 0 && sets !== 0){
              db.getUserInfoByAlexUserId(req.body.session.user.userId)
              .then(user =>{
                return db.updateNoWO(user.id, user.workout_completes + 1);
              })
            }
            alexaWorkout = alexaWorkout.length > 0 ? alexaWorkout : genWorkout;
            return alexaWorkout.splice(0, 1);
          }).then(([currentExercise]) => {
            current = currentExercise;
            res.json(alexaHelp.initWorkout(current));
          })
          .catch(err => {
            console.error(err);
            res.json(alexaHelp.PLACEHOLDER());
          });
        break;
      case 'coachExercise':
        db.getUserInfoByAlexUserId(req.body.session.user.userId)
          .then(user => {
            res.json(alexaHelp.coachExercise(current));
            sets++;
          })
          .catch(err => {
            console.error(err);
            res.json(alexaHelp.PLACEHOLDER())
          });
        break;
      case 'readWorkoutStatus':
        res.json(alexaHelp.readWorkout());
        break;
      case 'linkAccount':
        let link = req.body.request.intent.slots.accountName.value;
        link = link.split(' ').join('@');
        db.updateAlexaId(link, req.body.session.user.userId)
          .then(() => {
            res.json(alexaHelp.linkAccount(link));
          })
          .catch(err => {
            console.error(err);
            res.json(alexaHelp.PLACEHOLDER())
          })
        break;
      case 'changeView':
        let view = req.body.request.intent.slots.view.value;
        view = '/' + view.split(' ').join('');
        res.json(alexaHelp.changeView(view));
        break;
      case 'skipExercise':
        const former = current;
        db.getUserInfoByAlexUserId(req.body.session.user.userId)
          .then(user => {
            const squatComf = user.squat_comf;
            const numWorkouts = user.workout_completes;
            return workout.generateWorkout(numWorkouts, squatComf)
          })
          .then(genWorkout => {
            if (alexaWorkout.length === 0 && sets !== 0) {
              db.getUserInfoByAlexUserId(req.body.session.user.userId)
                .then(user => {
                  return db.updateNoWO(user.id, user.workout_completes + 1);
                })
            }
            alexaWorkout = alexaWorkout.length > 0 ? alexaWorkout : genWorkout;
            return alexaWorkout.splice(0, 1);
          }).then(currentExercise => {
            current = currentExercise;
            res.json(alexaHelp.skip(former, current));
          })
          .catch(err => {
            console.error(err);
            res.json(alexaHelp.PLACEHOLDER());
          });
        // res.json(alexaHelp.PLACEHOLDER());
        break;
      case 'AMAZON.HelpIntent':
        res.json(alexaHelp.help());
        break;
      case 'AMAZON.NavigateHomeIntent':
        res.json(alexaHelp.PLACEHOLDER());
        break;
      case 'AMAZON.FallbackIntent':
        //this intent is a catch all

        res.json(alexaHelp.default());
        break;
      default:
    }
  }
});

app.post('/savePartial', (req, res) => {
  let { id, exerciseId } = req.body;
  const d = new Date();
  db.insertPartialWorkout(id, exerciseId, d)
    .then()
    .catch(error => console.error());
  res.send('got it')
})

app.get('/calories', (req,res)=>{
  meal.setCalories(req.query.user, req.query.completes, req.query.today)
  .then(calorieProfile=>{
    res.send(calorieProfile)
  })
  .catch(err=>console.error(err))
})
const port = 81;
app.listen(port, () => {
  console.log(`HomeFit is listening on port ${port}!`);
  app.keepAliveTimeout = 0;
});

