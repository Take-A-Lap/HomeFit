const express = require('express')
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
const port = 3000

app.get('/', (req, res) => {
  res.render('../dist/HomeFit/main.js')
  res.send('Hello World!')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))