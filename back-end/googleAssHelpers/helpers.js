const {
  dialogflow,
  Image,
  SimpleResponse
} = require('actions-on-google')
const db = require('../database/dbHelpers');
const workout = require('../Algorithms/workout.js');


const app = dialogflow();

console.log(app, ' let\'s see whats inside of this on line 11 in google helpers');

app.intent('start workout', conv => {
  console.log(conv.id);
  // need to remember to grab the conversation id
  conv.ask(new SimpleResponse({
    text: 'Let me know when you are ready to begin.',
    speech: '<speak> <s> Let me know when you are ready to begin. </s> </speak>'
  }));
});

app.intent('next exercise', conv => {

});

app.intent('Default Fallback Intent', conv => {
  conv.ask(`I didn't understand. Can you tell me something else?`)
});

module.exports = app;