const express = require('express');
const bodyParser = require('body-parser');
const verifier = require('alexa-verifier-middleware');
const db = require('../database/dbHelpers');
const alexaHelp = require('../alexaHelpers/helpers');
const weather = require('../weather/weatherHelpers');
const app = express()
const meal = require('../Algorithms/recipe.js');
const workout = require('../Algorithms/workout.js');
const alexaRouter = express.Router()
const sse = require('../../sse');
const fs = require('fs');

app.use('/alexa', alexaRouter);
app.use(express.static('dist/HomeFit'));

alexaRouter.use(verifier)
alexaRouter.use(bodyParser.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

  let workouts = [];
  let sets = 0;
  let current;

app.use(express.static('dist/HomeFit'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/cornTest', (req, res) => {
  // workout.generateWorkoutSignUp(3)
  db.getExercisesFromExerciseWorkoutsByUserId(81)
    .then(result => {
      res.send(result);
    })
    .catch((err) => console.error(err))
})
app.get('/getUser', (req, res) => {
  console.log(req);
})
app.get('/homeFitAuth', (req, res) => {
  console.log(req);
  db.getPasswordByEmail(req.query.email)
  .then(password=> res.send(password))
})
app.get('/getMyWorkOut', (req,res)=>{
  db.getUserIdByEmail(req.query.email)
  .then((id)=>{
    db.getWorkoutsByUserID(id.id)
    .then((workouts) => {
      chorl = workouts[0].exercises
      res.send(chorl)
    })
  })
})
app.post('/updateWorkouts', (req, res)=>{
  console.log(req);
  // db.updateWorkoutsByUserId()
})
app.get('/weather', (req, res) => {
  weather.getWeather(body => {
    const parsedBody = JSON.parse(body);
    console.log(parsedBody)
    const weather = {
      text: parsedBody[0].WeatherText,
      city: 'New Orleans',
      state: 'LA',
      celsius: parsedBody[0].Temperature.Metric.Value,
      fahrenheit: parsedBody[0].Temperature.Imperial.Value,
      isDayTime: parsedBody[0].IsDayTime
    }
    res.send(weather);
  })
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
  db.getExercisesFromExerciseWorkoutsByUserId(81)

  .then(result => {
    res.send(result);
  })
  .catch((err)=>console.error(err))
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
    // console.log(meals.length);
  })    
})
app.post('/saveWO', (req, res)=> {
  console.log(req);
})
app.get('/test', (req, res) => {
  // console.log(req);
  
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
  // console.log(req);
  let weight = req.body.params.weight;
  let numPushUps = req.body.params.push_ups;
  let jogDist = req.body.params.miles;
  let age = req.body.params.age;
  let sex = req.body.params.sex;
  let height = req.body.params.height;
  let squatComf = req.body.params.squats;
  // let sets = (numPushUps / 2);
  let goals  = req.body.params.goals;
  let email  = req.body.params.email;
  let username = req.body.params.userName;
  let password = req.body.params.password;
  console.log(weight, numPushUps, jogDist, age, sex, height, squatComf, goals, email, username, password);
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

<<<<<<< HEAD
const port = 81;

=======
alexaRouter.post('/fitnessTrainer', (req, res) => {
  console.log(req.body.request.type, " this us the type of request")
  if (req.body.request.type === 'LaunchRequest') {
    // console.log(req.body, ' line 16 server index');
    db.getUserInfoByAlexUserId(req.body.session.user.userId)
      .then((user) => {
        const passingName = (user ? user.name : "not linked yet");
        console.log(passingName, ' this should be a value or say not linked yet')
        res.json(alexaHelp.invocationIntent(passingName));
      })
      .catch(err => {
        console.error(err);
      });
  } else if (req.body.request.type === 'SessionEndedRequest') {
    // console.log('SESSION ENDED');
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
        console.log(req.body.session.user.userId);

        db.getUserInfoByAlexUserId(req.body.session.user.userId)
          .then(user => {
            // console.log(user, ' this needs to not be an empty array');
            return db.getExercisesFromExerciseWorkoutsByUserId(user.id)
          })
          .then(exerWork => {
            // console.log(exerWork[0].exercises.slice(0, 1), " the array of json");
            console.log(workouts, ' this should not be an empty array ----- workouts------');
            workouts = workouts.length > 0 ? workouts : [].concat(exerWork.exercises.splice(0, 1));
            if (workouts[0].length) {
              workouts = workouts[0];
            }
            // console.log(workouts, ' this should be one days worth of workouts');
            res.json(alexaHelp.initWorkout(workouts[0], 8 - workouts.length));
            return exerWork;
          })
          .then(exercises => {
            // this would be a good place to generate the workouts as they are being taken off
            if (!exercises.exercises.length || exercises === undefined) {
              workout.generateWorkoutSignUp(3, (workoutArr) => {
                db.updateWorkoutsByUserId(exercises.id_user, workoutArr);
              });
            } else {
              db.updateWorkoutsByUserId(exercises.id_user, exercises.exercises);
            }
          })
          .catch(err => {
            console.error(err);
          });
        break;
      case 'coachExercise':
        // console.log(workouts, ' line 97 this should be an array of objects');
        db.getUserInfoByAlexUserId(req.body.session.user.userId)
          .then(user => {
            // console.log(userArr, ' this needs to not be an empty array');
            return db.getExercisesFromExerciseWorkoutsByUserId(user.id)
          })
          .then(exerWork => {
            // console.log(exerWork[0].exercises.slice(0, 1), " the array of json the second one");
            console.log(workouts, ' this should equal workouts from above')
            workouts = workouts.length > 0 ? workouts : [].concat(exerWork.exercises.splice(0, 1));
            if (workouts[0].length) {
              workouts = workouts[0];
            }
            if (current === undefined) {
              current = workouts.splice(0, 1);
              sets++;
            }
            if (sets <= 3) {
              sets++;
            } else {
              console.log('this should mean that current and sets have been reset')
              current === undefined;
              sets = 0;
            }
            console.log(sets, " this should never be more than 3");
            // console.log(workouts, ' this should be one days worth of workouts the second one');
            res.json(alexaHelp.coachExercise(current));
            return exerWork;
          })
          .then(exercises => {
            // this would be a good place to generate the workouts as they are being taken off
            if (!exercises.exercises.length || exercises === undefined) {
              workout.generateWorkoutSignUp(3, (workoutArr) => {
                db.updateWorkoutsByUserId(exercises.id_user, workoutArr);
              });
            } else {
              db.updateWorkoutsByUserId(exercises.id_user, exercises.exercises);
            }
          })
          .catch(err => {
            console.error(err);
          });
        break;
      case 'readWorkoutStatus':
        res.json(alexaHelp.readWorkout());
        break;
      case 'linkAccount':
        let link = req.body.request.intent.slots.accountName.value;
        link = link.split(' ').join('@');
        console.log(link, ' line 84 server index');
        db.updateAlexaId(link, req.body.session.user.userId)
          .then(() => {
            console.log('successful update to user');
          })
          .catch(err => {
            console.error(err);
          })
        res.json(alexaHelp.linkAccount(link));
        break;
      case 'changeView':
        let view = req.body.request.intent.slots.view.value;
        view = '/' + view.split(' ').join('');
        console.log(view, ' should be the value of the view slot');
        res.json(alexaHelp.changeView(view));
        break;
      case 'skipExercise':
        console.log(workouts, " this should hold the list of workouts that are left incase we wish to skip to the next workout");
        console.log(req.body.request.intent, " ||||-----|||| this is skip exercise");
        res.json(alexaHelp.PLACEHOLDER());
        break;
      case 'AMAZON.HelpIntent':
        console.log(req.body.request.intent, "||||-----|||| this is the amazon help intent");
        res.json(alexaHelp.help());
        break;
      case 'AMAZON.NavigateHomeIntent':
        console.log(req.body.request.intent, "||||-----|||| this is the amazon navigate home intent");
        res.json(alexaHelp.PLACEHOLDER());
        break;
      case 'AMAZON.FallbackIntent':
        //this intent is a catch all
        console.log(req.body.request.intent, " ||||-----|||| this is the amazon fallback intent");

        res.json(alexaHelp.default());
        break;
      default:
        console.log('we don\'t know what they said');
        console.log('req.body.request.intent');
    }
  }
});

const port = 3000;
>>>>>>> b8d9b242019b1d1584e65d178c2ca91f853380bf
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
  app.keepAliveTimeout = 0;
});
