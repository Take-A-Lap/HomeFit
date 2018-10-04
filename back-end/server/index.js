const express = require('express')
const bodyParser = require('body-parser');
const verifier = require('alexa-verifier-middleware');
const db = require('../database/dbHelpers');
const app = express()

const alexaRouter = express.Router()
app.use('/alexa', alexaRouter)

// attach the verifier middleware first because it needs the entire
// request body, and express doesn't expose this on the request object
alexaRouter.use(verifier)
////////////////////////
// Routes that handle alexa traffic are now attached here.
// Since this is attached to a router mounted at /alexa,
// endpoints with alexa/blah blah will be caught at blah blah
alexaRouter.post('/fitnessTrainer', (req, res) => {
  if (req.body.request.type === 'LaunchRequest'){
    // res.json(//toda method goes here);
  } else if (req.body.request.type === 'SessionEndedRequest'){
    console.log('SESSION ENDED');
  } else if (req.body.request.type === 'IntentRequest') {
    switch (req.body.request.intent.name) {
      case 'AMAZON.CancelIntent':
      case 'AMAZON.StopIntent':
        //do some stuff
        break;
      case 'startWorkout':
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const port = 3000
app.use(express.static('dist/HomeFit'));

app.get('/', (req, res) => res.send('Hello World!'))

// TODO: create routes that can be used if for nothing else testing

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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
