const express = require('express');
const bodyParser = require('body-parser');
const verifier = require('alexa-verifier-middleware');
const db = require('../database/dbHelpers');
const alexaHelp = require('../alexaHelpers/helpers');
const weather = require('../weather/weatherHelpers');
const app = express()
const meal = require('../Algorithms/recipe.js');
const workout = require('../Algorithms/workout.js');
const sse = require('../../sse');
const fs = require('fs');
const google = require('../googleAssHelpers/helpers');
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

app.get('/generateWO', (req, res)=> {
  console.log(req.query.wo_index)
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

app.get('/getUser', (req, res) => {
  db.getUserInfoByEmail(req.query.email)
  .then((id)=>{
    res.send(id)})
  .catch(err=>console.error(err));
})

app.post('/inProgress', (req, res)=>{
  console.log(req.body);
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
      let completedWorkouts = [];
      db.getCompCardioByUserId(id)
        .then(compCardio => {
          if (compCardio) {
            completedWorkouts = completedWorkouts.concat(compCardio);
          }
          db.getCompStrByUserId(id)
            .then(compStr => {
              if (compStr) {
                completedWorkouts = completedWorkouts
                  .concat(compStr)
                  .map(wo => wo.date.getDate())
                  .filter((date, i, a) => a.indexOf(date) === i);
                res.send(completedWorkouts);
              }
            })
        })
    })
    .catch(err=>console.error(err));
});

app.get('/homeFitAuth', (req, res) => {
  db.getPasswordByEmail(req.query.email)
  .then(password=> {
    res.send(password)
  })
})

app.post('/completed', (req, res)=>{
  var d = new Date();
  db.insertIntoCompStr(1, req.body.params.id, 10, true, d)
  .then(()=>res.send('tallied!'))
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
    })
    .then(() => {
      return weather.runningRecommendations(weatherInfo)
    })
    .then(data => {
      weatherInfo.recommendation = data
    })
    .then(() => db.getWeatherImages(weatherInfo.text, weatherInfo.time_of_day))
    .then(result => {
      weatherInfo.url = result
    })
    .then(() => {
      res.send(weatherInfo)
    })
    .catch((err) => console.error(err /*'Good luck finding that error, bitch'*/ ))
  })

app.get('/dinner', (req,res)=> {
  let meals;
  let dinner = [];
  Promise.all([
    meal.getChicken(300, 700, "alcohol-free"), 
    meal.getBeef(300, 700, "alcohol-free"), 
    meal.getFish(300, 700, "alcohol-free"),
    meal.getSteak(300, 700, "alcohol-free")
  ])
  .then(recipes => {
    meals = recipes.reduce((acc, curr) => acc.concat(curr), [])
    return meals;
  }).then(meals => {
    return meal.narrowDown(meals)
  }).then(randomArray => {
    randomArray.forEach(index => dinner.push(meals[index]))
  }).then(() => {
    res.send(dinner)
  }).catch(err => console.error(err))
});

app.get('/lunch', (req,res) => {
  let meals;
  let lunch = [];
  meal.getLunch(0, 500, "alcohol-free")
  .then(recipes => {
    meals = recipes.reduce((acc, curr) => acc.concat(curr), [])
    return meals;
  }).then(meals => {
    return meal.narrowDown(meals);
  }).then(randomArray => {
    randomArray.forEach(index => lunch.push(meals[index].recipe))
  }).then(() => {
    res.send(lunch)
  }).catch(err => console.error(err))
  .catch(err=>console.error(err))
})

app.get('/breakfast', (req, res) => {
  let meals;
  let breakfast = [];
  Promise.all([meal.getBreakfast(300, 700, "alcohol-free"), meal.getYogurt(300, 700, "alcohol-free"), meal.getEggs(300, 700, "alcohol-free")])
  .then(recipes=>{
    meals = recipes.reduce((acc,curr)=>acc.concat(curr),[])
    return meals;
  }).then(meals=>{
    return meal.narrowDown(meals)
  }).then(randomArray=>{
    randomArray.forEach(index=>breakfast.push(meals[index].recipe))
  }).then(()=>{
    res.send(breakfast)
  }).catch(err=>console.error(err))
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
  db.addNewUser(weight, numPushUps, jogDist, age, sex, height, squatComf, goals, email, username, password)
    .then(()=>{
      return Promise.all([db.getUserIdByEmail(email)])
        .catch(err=>console.error(err));
    })
    .then(([user,regimen])=> {
      const ins = [];
      regimen.forEach(exer=>{
        ins.push(JSON.stringify(exer))
      })
      db.insertIntoExerciseWorkoutsByUserIdAndArrayOfJson(user.id, ins)
    })
    .catch(err=>console.error(err));
  res.end();
});

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

const port = 3000;
app.listen(port, () => {
  console.log(`HomeFit is listening on port ${port}!`);
  app.keepAliveTimeout = 0;
});
