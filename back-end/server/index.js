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
  db.getUserById(1)
  .then(({ userArr }) => {
    send(userArr);
  })
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))