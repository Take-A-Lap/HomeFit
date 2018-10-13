const {
  dialogflow,
  Image,
} = require('actions-on-google')
const db = require('../database/dbHelpers');

const app = dialogflow();


app.intent('start workout', conv => {
  console.log('please tell me this is at least called');
  conv.ask('This is a test to see that you are connected to the server');
});

app.intent('Default Fallback Intent', conv => {
  conv.ask(`I didn't understand. Can you tell me something else?`)
});

module.exports = app;