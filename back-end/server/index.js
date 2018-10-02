const express = require('express')
const bodyParser = require('body-parser');
const db = require('../database/dbHelpers');
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
const port = 3000

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
  const { userId } = req.body;
  // const { arrayOfJson } = req.body;
  db.removeUserWorkout(userId)
  .then()
  .catch((err) => {
    console.error(err);
  });
  res.end();
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))