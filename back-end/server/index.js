const express = require('express')
const bodyParser = require('body-parser');
const verifier = require('alexa-verifier-middleware');
const db = require('../database/dbHelpers');
const alexaHelp = require('../alexaHelpers/helpers');
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

app.use(sse);

app.get('/events', (sseReq, sseRes) => {

  console.log('I have a connection');

  sseRes.sseSetup();

  sseRes.sseSend("Hello This is a connection");
  // sseRes.sseSend("Hey Again, I can connect more than once");

  // attach the verifier middleware first because it needs the entire
  // request body, and express doesn't expose this on the request object

  alexaRouter.post('/fitnessTrainer', (req, res) => {
    if (req.body.request.type === 'LaunchRequest') {
      console.log(req.body.request, ' line 16 server index');
      res.json(alexaHelp.invocationIntent());
    } else if (req.body.request.type === 'SessionEndedRequest') {
      console.log('SESSION ENDED');
    } else if (req.body.request.type === 'IntentRequest') {
      switch (req.body.request.intent.name) {
        case 'AMAZON.CancelIntent':
        case 'AMAZON.StopIntent':
        //do some stuff
        break;
        case 'startWorkout':
          /** if the start workout intent is found you should be able to call 
           *  the sseRes.sseSend(data) with the data to send to the front end
          */
          //do some stuff
          break;
          case 'recommendRecipe':
          //do some stuff
          break;
          case 'readWorkoutStatus':
          //do stuff
          break;
          default:
          console.log('we don\'t know what they said');
      }
    }
  });
});
////////////////////////
// Routes that handle alexa traffic are now attached here.
// Since this is attached to a router mounted at /alexa,
// endpoints with alexa/blah blah will be caught at blah blah

app.use(express.static('dist/HomeFit'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', (req, res) => res.send('Hello World!'))
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
  db.getYoutubeLink('Burpee')
  .then((userArr) => {
    res.send(userArr);
  })
  .catch((err) =>{
    console.error(err);
  });
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

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
