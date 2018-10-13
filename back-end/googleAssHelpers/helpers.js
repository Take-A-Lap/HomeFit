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
  console.log('please tell me this is at least called');
  conv.ask('This is a test to see that you are connected to the server');
  conv.ask('Hi, how is it going?');
  conv.ask(`Here's a picture of a cat`);
  conv.ask(new Image({
    url: 'https://developers.google.com/web/fundamentals/accessibility/semantics-builtin/imgs/160204193356-01-cat-500.jpg',
    alt: 'A cat',
  }));
  conv.ask(new SimpleResponse({
    text: '<s> Let me know when you are ready to begin.</s>',
    speech: '<s> Let me know when you are ready to begin.</s>'
  }));
});

app.intent('Default Fallback Intent', conv => {
  conv.ask(`I didn't understand. Can you tell me something else?`)
});

module.exports = app;