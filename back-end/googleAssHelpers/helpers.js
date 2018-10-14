const {
  dialogflow,
  Image,
  SimpleResponse
} = require('actions-on-google')
const db = require('../database/dbHelpers');
const workout = require('../Algorithms/workout.js');


const app = dialogflow();

console.log(app, ' let\'s see whats inside of this on line 11 in google helpers');

// app.intent('Default Welcome Intent', (conv) => {
//   conv.ask(new Permission({
//     context: 'Hi there, to get your workout ready',
//     permissions: 'NAME'
//   }));
// });

app.intent('link account', conv => {
  
  console.log(conv.body.sessionId, ' looking for the value of the session id');
  db.getUserInfoByName(conv.body.queryResult.parameters.accountName)
  .then(user => {
    if(user !== undefined){
      conv.ask(new SimpleResponse({
        text: `Thank You!`,
        speech: `<speak> <s> Thank you </s> <s> ${conv.body.queryResult.parameters.accountName} </s> <s> for linking your account to the our current session. </s> <s> Lets get started </s> </speak>`
      }));
      return db.updateGoogleSessionIdForUser(conv.body.queryResult.parameters.accountName, conv.body.sessionId);
    }
    conv.ask(new SimpleResponse({
      text: `Please try again`,
      speech: `<speak> <p> <s> I'm sorry, I may have miss heard you. </s> <s> Could you try again? </s> </p> </speak>`
    }));
  });
});

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