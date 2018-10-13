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
app.get('/cornTest', (req, res) => {
  db.updateNoWO(17,2)
  .then((results)=>res.send(results))
  .catch((err) => console.error(err))
})

app.get('/generateWO', (req, res)=> {
  console.log(req.query.wo_num);
  wo_num = req.query.wo_num;
  diff = req.query.diff;
  workout.generateWorkoutSignUp(wo_num, diff)
  .then(workout=>res.send(workout))
  .catch(err=>console.error(err));
})

app.get('/getUser', (req, res) => {
  db.getUserInfoByEmail(req.query.email)
  .then((id)=>res.send(id))
  .catch(err=>console.error(err));
})

app.get('/getUserId', (req, res) => {
  db.getUserIdByEmail( req.query.email)
    .then((id) => res.send(id))
    .catch(err => console.error(err));
})

app.get('/getUser', (req, res) => {
  console.log(req.query.email)
  db.getUserInfoByEmail(req.query.email)
    .then((id)=>res.send(id))
    .catch(err=>console.error(err));
})

app.get('/getCompletedWO', (req, res) => {
  console.log(req.query.email)
  db.getUserInfoByEmail(req.query.email)
    .then((userInfo)=> {
      return userInfo;
    })
    .then(({ id }) => {
      // use the id to query the completed str and cardio tables
      let completedWorkouts = [];
      db.getCompCardioByUserId(id)
        .then(compCardio => {
          completedWorkouts.push(compCardio);
          db.getCompStrByUserId(id)
            .then(compStr => {
              completedWorkouts.push(compStr);
              return completedWorkouts;
            })
        })
    })
    .then(completedWorkouts => {
      res.send(completedWorkouts);
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
  console.log(req.body.params.date);
  var d = new Date();
  db.insertIntoCompStr(1, req.body.params.id, 10, true, d)
  .then(()=>res.send('tallied!'))
})

app.get('/getMyWorkOut', (req,res)=>{
  const int = parseInt(req.query.id)
  db.getWorkoutsByUserID(int)
  .then((workouts) => {
    res.send(workouts.exercises)
  })
  .catch((ugh)=>console.error(ugh));
})

app.post('/updateWorkouts', (req, res)=>{
  console.log(req.body.params.id)
  db.updateNoWO(req.body.params.id, req.body.params.value)
  .then(()=>res.send('workouts updated'))
})

// app.get('/weather', (req, res) => {
//   weather.getWeather((body) => {
//     const parsedBody = JSON.parse(body);
//     // console.log(parsedBody)
//     const weatherInfo = {
//       text: parsedBody[0].WeatherText,
//       city: 'New Orleans',
//       fahrenheit: parsedBody[0].Temperature.Imperial.Value,
//       celsius: parsedBody[0].Temperature.Metric.Value,
//       isDayTime: parsedBody[0].IsDayTime
//     }
//     res.send(weatherInfo)
//   })
//   // res.send(200);
// })


app.post('/weather', (req, res) => {
  console.log(req.body.params.latitude, req.body.params.longitude, 'work pretty please');
  weather.getWeatherDarkSky(req.body.params.latitude, req.body.params.longitude, (err, body) => {  
    // console.log(body)
    let weatherInfo = {};
    if (err) {
      console.error(err);
    } else {
      const parsedBody = JSON.parse(body.body);
      weatherInfo = {
        text: parsedBody.currently.summary,
        temp: Math.floor(parsedBody.currently.temperature),
        apparentTemp: Math.floor(parsedBody.currently.apparentTemperature),
        humidity: parsedBody.currently.humidity,
        icon: parsedBody.currently.icon
      }
      weather.getCityNameForWeatherInfo(req.body.params.latitude, req.body.params.longitude, (err, body) => {
        if (err) {
          console.error(err);
        } else {
          const parsedForCity = JSON.parse(body.body);
            weatherInfo.city = parsedForCity.Response.View[0].Result[0].Location.Address.City;
            weatherInfo.state = parsedForCity.Response.View[0].Result[0].Location.Address.State;
            weatherInfo.country = parsedForCity.Response.View[0].Result[0].Location.Address.Country;
          weather.createDayNightLabel(req.body.params.timeStamp, (body) => {
            weatherInfo.time_of_day = body;
          })
          weather.runningRecommendations(weatherInfo, (data) => {
            weatherInfo.recommendation = data;
          })
          db.getWeatherImages(weatherInfo.text, weatherInfo.time_of_day)
            .then(result => { weatherInfo.url = result })
              .then(() => {res.send(weatherInfo)})
        }
      })
    }
  })
  // res.sendStatus(201);
  // res.end();
})


app.get('/dinner', (req,res)=> {
  let meals = [];
  let dinnerResponse = [];
  meal.getChicken(300, 700, "alcohol-free", (meal) => {
    let result = JSON.parse(meal);
    let recipes = result.hits;
    recipes.forEach(recipe => {
      meals.push(recipe);
    });
  })
  meal.getBeef(300, 700, "alcohol-free", (meal) => {
    let result = JSON.parse(meal);
    let recipes = result.hits;
    recipes.forEach(recipe => {
      meals.push(recipe);
    });
  })
  meal.getFish(300, 700, "alcohol-free", (meal) => {
    let result = JSON.parse(meal);
    let recipes = result.hits;
    recipes.forEach(recipe => {
      meals.push(recipe);
    });
  })
  
  function generateSeven(array) {
    let randScreen = [];
    let randomNumbers = {};
    for (let i = 1; i <= 7; i++) {
      let gen = Math.floor(Math.random() * array.length);
      randomNumbers[i] = randScreen.includes(gen) ? Math.floor(Math.random() * array.length) : gen;
    }
    let randomNumberArray = Object.values(randomNumbers);
    randomNumberArray.forEach(randomNumber => {
      dinnerResponse.push(array[randomNumber]);
    });
  }

  meal.getSteak(300, 700, "alcohol-free", (meal) => {
    let result = JSON.parse(meal);
    let recipes = result.hits;
    recipes.forEach(recipe => {
      meals.push(recipe);
    });
    generateSeven(meals);
    dinnerResponse = dinnerResponse.map(dinner => dinner.recipe)
    res.send(dinnerResponse);
  });
});

app.get('/lunch', (req,res) => {
  let lunchRecipes = [];
  meal.getLunch(0,500,"alcohol-free", (meals) => {
    let result = JSON.parse(meals);
    meal.generateSeven(result.hits, lunchRecipes);
    res.send(lunchRecipes);
  })
})
app.get('/signupWO', (req,res)=>{
  return Promise.all([
    db.getUs, 
    workout.generateWorkoutSignUp(3)
  ])
  .then(([user, regimen])=>{
      db.insertIntoExerciseWorkoutsByUserIdAndArrayOfJson(user.id, regimen);
  })
  .catch((err)=>{
    console.error(err);
  });
})

app.get('/cornTest', (req,res)=>{
  // workout.generateWorkoutSignUp(3)
  workout.generateWorkoutSignUp(3)
  // db.insertIntoExerciseWorkoutsByUserIdAndArrayOfJson(89, )

  .then(result => {
    console(result);
    res.send(result);
  })
  .catch((err)=>console.error('err'))
})

app.get('/breakfast', (req, res) => {
  let meals = [];
  let breakfastResponse = [];
  meal.getBreakfast(300, 700, "alcohol-free", (meal) => {
    let result = JSON.parse(meal);
    let recipes = result.hits;
    recipes.forEach(recipe => {
      meals.push(recipe);
    });
  })     
  meal.getYogurt(300, 700, "alcohol-free", (meal) => {
    let result = JSON.parse(meal);
    let recipes = result.hits;
    recipes.forEach(recipe => {
      meals.push(recipe);
    });
  })      
  function generateSeven(array){
    let randScreen = [];
    let randomNumbers = {};
    for(let i = 1; i <= 7; i++){
      let gen = Math.floor(Math.random() * array.length);
      randomNumbers[i] = randScreen.includes(gen) ? Math.floor(Math.random() * array.length) : gen;
    }
    let randomNumberArray = Object.values(randomNumbers);
    randomNumberArray.forEach(randomNumber => {
      breakfastResponse.push(array[randomNumber]);
    });
  }
  meal.getEggs(300, 700, "alcohol-free", (meal) => {
    let result = JSON.parse(meal);
    let recipes = result.hits;
    recipes.forEach(recipe => {
      meals.push(recipe);
    });
    generateSeven(meals);
    res.send(breakfastResponse);
  })    
})

app.post('/saveWO', (req, res)=> {
  console.log(req);
})

app.get('/test', (req, res) => {  
  db.getUserInfoByAlexUserId('amzn1.ask.account.AFWHU5DLSJKR37FXXMVFLKDMCVZ3I76D7XRR4G4772UAFSUDXV63TM36PZWVEOP2NG4E7BPKX2QHY6D7ZMSEUY3HQSBC3XFQDPB5MG7VAQVK3NJFDERKW5YXCSKHI5J35DWLGLJQXEWQKS6DJKUJX5YVGYJOJNEVISHCU6U2RQ5VW7N3UCPQWCHVSB467UFO75NLB62WRBTVGRY')
  .then(userArr => {
    res.send(userArr);
  })
  .catch(err => {
    console.error(err);
  })
});

app.get('/recallWOs', (req, res)=>{

});

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
    return Promise.all([db.getUserIdByEmail(email), workout.generateWorkoutSignUp(squatComf)])
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
        console.log(req.body.session.user.userId);
        
        const passingName = (user ? user.name : "not linked yet");
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
            // console.log(user, ' this needs to not be an empty array');
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
            console.log(alexaWorkout, " should be some exercises");
            
            return alexaWorkout.splice(0, 1);
          }).then(([currentExercise]) => {
            console.log(currentExercise, 'this need to be defined as the current exercise');
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
        console.log(link);
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
            // console.log(user, ' this needs to not be an empty array');
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
