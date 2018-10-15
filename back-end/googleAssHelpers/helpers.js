const {
  dialogflow,
  Image,
  SimpleResponse
} = require('actions-on-google')
const db = require('../database/dbHelpers');
const workout = require('../Algorithms/workout.js');

let googleWorkout = [];
let current;

const app = dialogflow();

console.log(app, ' let\'s see whats inside of this on line 11 in google helpers');

app.intent('link account', conv => {
  
  console.log(conv.id, ' looking for the value of the session id');
  return db.getUserInfoByName(conv.body.queryResult.parameters.accountName)
  .then(user => {
    if(user !== undefined){
      conv.ask(new SimpleResponse({
        text: `Thank You!`,
        speech: `<speak> <s> Thank you </s> <s> ${conv.body.queryResult.parameters.accountName} </s> <s> for linking your account to the our current session. </s> <s> Lets get started </s> </speak>`
      }));
      return db.updateGoogleSessionIdForUser(conv.body.queryResult.parameters.accountName, conv.id);
    }
    conv.ask(new SimpleResponse({
      text: `Please try again`,
      speech: `<speak> <p> <s> I'm sorry, I may have miss heard you. </s> <s> Could you try again? </s> </p> </speak>`
    }));
  });
});

app.intent('start workout', conv => {
  console.log(conv.id, ' conv.id inside the start workout intent');
  // need to remember to grab the conversation id
  return db.getUserInfoByGoogleSessionId(conv.id)
  .then(user => {
    if (user !== undefined) {
      const squatComf = user.squat_comf;
      const numWorkouts = user.workout_completes;
      return workout.generateWorkout(numWorkouts, squatComf);
    } else {
      conv.ask(new SimpleResponse({
        test: 'Please link your session with your account.',
        speech: `<speak> <p> I am sorry but we need to connect you to your account. </p> <p> All you have to do to link your account is say ink my account followed by your account name </p> </speak>`
      }));
    }
  })
  .then(genWorkout => {
    if (genWorkout !== undefined) {
      googleWorkout = googleWorkout.length > 0 ? googleWorkout : genWorkout;
      return googleWorkout.splice(0, 1);
    }
  })
  .then(([currentExercise]) => {
    if (currentExercise !== undefined) {
      current = currentExercise;
      console.log(current, ' this should the current workout object');
      
      conv.ask(new SimpleResponse({
        text: 'Let me know when you are ready to begin.',
        speech: '<speak> <s> Let me know when you are ready to begin your ' + current.name + ' exercise. </s> <s> Let me know when you are in position </s> </speak>'
      }));
    }
  })
  .catch(err => {
    console.error(err);
    conv.ask(new SimpleResponse({
      text: 'Something went wrong',
      speech: `<speak> <p> I'm sorry something appears to have gone wrong. Please try again </p> </speak>`
    }));
  })
});

app.intent('next exercise', conv => {
  console.log(conv.id, " conv.id inside of the next exercise intent");
  
  return db.getUserInfoByGoogleSessionId(conv.id)
  .then(user => {
    if (user !== undefined) {
      if (current !== undefined){
        let cadence = "<speak> <s> The recommended pace for " + current.name + " is ${current.rep_time * 1000} seconds. </s> <s> Let's begin on the count of 3. </s> 1 <break time=\"1s\"> 2 <break time=\"1s\"> <s> 3 </s>";
        for (let i = 1; i < 11; i++) {
          cadence += ' give me a '+ i + ' <break time="' + current.rep_time + 'ms">';
        }
        cadence += ' </speak>';
        conv.ask(new SimpleResponse({
          text: `Try and keep pace`,
          speech: cadence
        }));
      }
    } else {
      conv.ask(new SimpleResponse({
        test: 'Please link your session with your account.',
        speech: `<speak> <p> I am sorry but we need to connect you to your account. </p> <p> All you have to do to link your account is say ink my account followed by your account name </p> </speak>`
      }));
    }
  })
  .catch(err => {
    console.log(err);
      conv.ask(new SimpleResponse({
        text: 'Something went wrong',
        speech: `<speak> <p> I'm sorry something appears to have gone wrong. Please try again </p> </speak>`
      }));
    })
  });

app.intent('Default Fallback Intent', conv => {
  conv.ask(`I didn't understand. Can you tell me something else?`)
});

module.exports = app;