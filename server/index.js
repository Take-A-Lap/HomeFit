const express = require('express')
const bodyParser = require('body-parser');
const app = express()

const workout = require('../src/Algorithms/workout.js');
const meal = require('../src/Algorithms/recipe.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
const port = 3000

app.get('/', (req, res) => {
  res.render('../dist/HomeFit/main.js')
  res.send('Hello World!')
})

app.get('test', (req, res) => {
  workout.generateWorkoutLeg(3)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))