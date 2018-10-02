const express = require('express')
const bodyParser = require('body-parser');

const db = require('../database/dbHelpers');
const app = express()

const workout = require('../Algorithms/workout.js');
const meal = require('../Algorithms/recipe.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

const port = 3000
app.use(express.static('dist/HomeFit'));

app.get('/', (req, res) => res.send('Hello World!'))

// TODO: create routes that can be used if for nothing else testing
  app.get('/cornTest', (req, res) => {
    res.send(workout.generateWorkoutLeg(3))
    // .then((workout)=>{
    //   res.send(workout);
    // })
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

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
