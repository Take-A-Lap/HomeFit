const express = require('express')
const bodyParser = require('body-parser');
const verifier = require('alexa-verifier-middleware');
const db = require('../database/dbHelpers');
const alexaHelp = require('../alexaHelpers/helpers');
const app = express()
const alexaRouter = express.Router()
app.use('/alexa', alexaRouter)

// attach the verifier middleware first because it needs the entire
// request body, and express doesn't expose this on the request object
alexaRouter.use(verifier)
alexaRouter.use(bodyParser.json());
alexaRouter.post('/fitnessTrainer', (req, res) => {
  if (req.body.request.type === 'LaunchRequest') {
    // console.log(req.body, ' line 16 server index');
    db.getUserInfoByAlexUserId(req.body.session.user.userId)
    .then((userArr)=>{
      const passingName = userArr[0].name || "not linked yet";
      res.json(alexaHelp.invocationIntent(passingName));
    })
    .catch(err => {
      console.error(err);
    });
  } else if (req.body.request.type === 'SessionEndedRequest') {
    // console.log('SESSION ENDED');
  } else if (req.body.request.type === 'IntentRequest') {
    switch (req.body.request.intent.name) {
      case 'AMAZON.CancelIntent':
      case 'AMAZON.StopIntent':
        alexaHelp.stopAndExit();
        break;
      case 'startWorkout':
        //do some stuff
        db.getUserInfoByAlexUserId(req.body.session.user.userId)
        .then(userArr => {
          return db.getExercisesFromExerciseWorkoutsByUserId(userArr[0].id)
        })
        .then(exerWorkArr => {
          console.log(exerWorkArr[0], " the array of json");
          
        })
        .catch(err => {
          console.error(err);
        });
        res.json(alexaHelp.startWorkout());
        break;
      case 'recommendRecipe':
        //do some stuff
        break;
      case 'readWorkoutStatus':
        //do stuff
        break;
      case 'linkAccount':
        // console.log(req.body.request.intent.slots, ' line 43 server index');
        db.updateAlexaId(req.body.request.intent.slots.accountName.value, req.body.session.user.userId)
        .then(() => {
          // console.log('account should be added to the database');
        })
        .catch(err => {
          console.error(err);
        })
        res.json(alexaHelp.linkAccount(req.body.request.intent.slots.accountName.value));
        break;
      default:
        console.log('we don\'t know what they said');
    }
  }
});
////////////////////////
// Routes that handle alexa traffic are now attached here.
// Since this is attached to a router mounted at /alexa,
// endpoints with alexa/blah blah will be caught at blah blah

const workout = require('../Algorithms/workout.js');
const meal = require('../Algorithms/recipe.js');

const port = 81
app.use(express.static('dist/HomeFit'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/home', (req, res) => {
  res.redirect('localhost:3000/signup')
})

app.get('/dinner', (req,res)=>{
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
app.get('/lunch', (req,res)=>{
  let lunchRecipes = [];
  meal.getLunch(0,500,"alcohol-free", (meals)=>{
    let result = JSON.parse(meals);
    meal.generateSeven(result.hits, lunchRecipes);
    res.send(lunchRecipes);
  })
})
app.get('/signupWO', (req,res)=>{
  workout.generateWorkoutSignUp(3, (workout)=> {
    res.send(workout);
  })
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

app.post('/test', (req, res) =>{
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


app.listen(port, () => console.log(`Example app listening on port ${port}!`))
