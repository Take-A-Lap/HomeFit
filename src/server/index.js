const express = require('express')
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
const port = 3000

app.use(express.static(__dirname + '/dist/HomeFit/index.html'));
app.set('view engine', 'pug');
app.get('/', (req, res) => {
  res.render('../out-tsc/app')
})
app.get('/test', (req, res)=> {
  res.send('Hello')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))