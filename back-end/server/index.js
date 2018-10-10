const express = require('express')
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

app.use('/alexa', alexaRouter);
app.use(express.static('dist/HomeFit'));

alexaRouter.use(verifier)
alexaRouter.use(bodyParser.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// app.use(sse);

// app.get('/events', (sseReq, sseRes) => {

//   console.log('I have a connection');

 // sseRes.sseSetup();
  // fire off events
 // sseRes.sseSend("Hey Again, I can connect more than once");
  // sseRes.newEvent("We Got More Data");

  // attach the verifier middleware first because it needs the entire
  // request body, and express doesn't expose this on the request object

alexaRouter.post('/fitnessTrainer', (req, res) => {
  let workouts = [];
  console.log(req.body.request.type, " this si the type of the request body")
  if (req.body.request.type === 'LaunchRequest') {
    // console.log(req.body, ' line 16 server index');
    db.getUserInfoByAlexUserId(req.body.session.user.userId)
    .then((userArr)=>{
      const passingName = (userArr[0] ? userArr[0].name : "not linked yet");
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
      case 'startWorkout':
        //do some stuff
        console.log(req.body.session.user.userId);
        
        db.getUserInfoByAlexUserId(req.body.session.user.userId)
        .then(userArr => {
          // console.log(userArr, ' this needs to not be an empty array');
          return db.getExercisesFromExerciseWorkoutsByUserId(userArr[0].id)
        })
        .then(exerWorkArr => {
          console.log(exerWorkArr[0].exercises, " the array of json");

          workouts = workouts[0].length > 0 ? workouts : workouts.concat(exerWorkArr[0].exercises[0].splice(0, 1));
          console.log(workouts, ' this should be one days worth of workouts');
          res.json(alexaHelp.startWorkout(workouts[0], 6 - workouts.length));
          return exerWorkArr[0];
        })
        .then(exercises => {
          // this would be a good place to generate the workouts as they are being taken off
          if(!exercises.exercises.length || exercises === undefined) {
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
        case 'nextWorkout':
          res.json(alexaHelp.nextWorkout(workouts[0].splice(0, 1)));
          break;
        case 'recommendRecipe':
          res.json(alexaHelp.readRecipe());
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
          // sseRes.sseSend(view);
          res.json(alexaHelp.changeView(view));
          break;
      default:
        console.log('we don\'t know what they said');
        console.log('req.body.request.intent');
        // res.json(alexaHelp.default());
    }
  }
});

// });
////////////////////////
// Routes that handle alexa traffic are now attached here.
// Since this is attached to a router mounted at /alexa,
// endpoints with alexa/blah blah will be caught at blah blah

app.use(express.static('dist/HomeFit'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/home', (req, res) => {
  res.redirect('localhost:3000/signup')
})

app.get('/personalInfo', (req, res) => {
  res.redirect('localhost:3000/signup')
})

//api call for weather
app.get('/api/weather', (req, res) => {
  weather.getWeather(body => {
    const parsedBody = JSON.parse(body);
    const weather = {
      text: parsedBody[0].WeatherText,
      city: 'New Orleans',
      state: 'LA',
      celsius: parsedBody[0].Temperature.Metric.Value,
      fahrenheit: parsedBody[0].Temperature.Imperial.Value
    }
    res.send(weather);
  })
})
app.get('/api/dinner', (req,res)=>{
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
    res.send(dinnerResponse);
  })
})
app.get('/api/lunch', (req,res)=>{
  let lunchRecipes = [];
  meal.getLunch(0,500,"alcohol-free", (meals)=>{
    let result = JSON.parse(meals);
    meal.generateSeven(result.hits, lunchRecipes);
    res.send(lunchRecipes);
  })
})
app.get('/api/signupWO', (req,res)=>{
  workout.generateWorkoutSignUp(3, (workout)=> {
    res.send(workout);
  })
})
app.get('/api/breakfast', (req, res) => {
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

app.post('/workinDatBody', (req, res)=> {
  if(req.params.woType === "back"){
    workout.generateWorkoutBack(3, (wo)=> {
      res.send(wo);
    })
  } else if (req.params.woType === "chest"){
    workout.generateWorkoutChest(3, (wo) => {
      res.send(wo);
    })
  } else if (req.params.woType === "legs") {
    workout.generateWorkoutLegs(3, (wo) => {
      res.send(wo);
    })
  } else if (req.params.woType === "cardio") {
    workout.generateWorkoutCardio(3, (wo) => {
      res.send(wo);
    })
  }
})

app.post('/personalInfo', (req, res) =>{
  // console.log(req.body);
  const { name } = req.body;
  const { weight } = req.body;
  const { numPushUps } = req.body;
  const { jogDist } = req.body;
  const { age } = req.body;
  const { sex } = req.body;
  const { height } = req.body;
  const { squatComf } = req.body;
  const { goals } = req.body;
  db.addNewUser(name, weight, numPushUps, jogDist, age, sex, height, squatComf, goals)
  .then()
  .catch((err) => {
    console.error(err);
  });
  res.end();
});

const port = 81;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
  app.keepAliveTimeout = 0;
});
