const {
  dialogflow,
  Image,
  SimpleResponse
} = require('actions-on-google')
const db = require('../database/dbHelpers');
const workout = require('../Algorithms/workout.js');

let googleWorkout = [];
let current;
const randomNumGen = (numOptions) => {
  return Math.floor(Math.random() * numOptions);
};
const app = dialogflow();

const errorResponses = [`<speak> <p> <s> I'm sorry, I may have miss heard you. </s> <s> Could you try again? </s> </p> </speak>`,
  `<speak> <p> I am terribly sorry </p> <p> I am having trouble understanding you </p> <p> If it isn't too much to ask could you try again? </p> </speak>`,
  `<speak> <s> This is embarrassing for me </s> <p> I sometimes have trouble with my hearing </p> <p> even at such a young age </p> <s> Would you kindly try the command again? </s> </speak>`
];

const linkAccountObjResponses = [
  {
    before: '<speak> <s> Thank you </s> <s> ',
    after: '</s> <s> for linking your account to your current session. </s> <s> Lets get started </s> </speak>'
  },
  {
    before: '<speak> <s> We apologize for the inconvenience </s> <p> <s>',
    after: '</s> </p> <break time ="750ms"/> <s> We have now linked your account to your current session with us. </s> <s> Lets get you moving </s>  </speak>'
  },
  {
    before: '<speak> <s> Well </s> <p> <s>',
    after: '</s> </p> <s> Looks like we are all set </s> <s> lets get started with those exercises </s> </speak>'
  },
  {
    before: '<speak>  <s> Glad to have you back ',
    after: '</s> <s> Now that we got all the technical stuff out of the way </s> <s> Lets egt ready to start that workout </s> </speak>'
  }
];

const startWorkoutObjResponses = [
  {
  before: '<speak> <s> Let me know when you are ready to begin your ',
  after: ' and are in position. </s> </speak>'
  },
  {
    before: '<speak> <s> Lets do some',
    after: '</s> <s> Let me know when you are ready</s></speak>'
  },
  {
    before: '<speak> <s> <prosody pitch="+20%" ><emphasis level="reduced"> cowabunga  </emphasis></prosody> </s><s>lets do some',
    after: '</s> </speak>'
  },
  {
    before: '<speak> ',
    after: '</speak>'
  }
];

const nextExerObjResponses = [
  {
    part1: {
      before: '<speak> <s> The recommended pace for ',
      prep: 'is',
      after: ' seconds. </s> <s> Let\'s begin </s> <break time="500ms" />'
    },
    part2: {
      before: ' <s> Let\ss take a break.</s> <s> Let me know when you are ready to do another set </s> <s> Or if you want to start ',
      after: ', we can do that as well</s> </speak>'
    }
  }
];

const greetings = [
  `<speak> <p> <s> Welcome to Home fit trainer </s> <s> The fitness trainer designed for your personal needs. </s> </p> <p> <s> Before we begin </s> <s> I will need you to connect our session to your home fit account </s> <s> To do that all you have to do is say link my account and say your account name </s> <s> after you link up we can begin today's workout </s> </p> </speak>`,
];

app.intent('Default Welcome Intent', conv =>{
  let index = randomNumGen(greetings.length);
  conv.ask(greetings[index]);
});

app.intent('link account', conv => {
  
  console.log(conv.id, ' looking for the value of the session id');
  return db.getUserInfoByName(conv.body.queryResult.parameters.accountName)
  .then(user => {
    if(user !== undefined){
      let index = randomNumGen(linkAccountObjResponses.length);
      conv.ask(new SimpleResponse({
        text: `Thank You!`,
        // speech: `<speak> <s> Thank you </s> <s> ${conv.body.queryResult.parameters.accountName} </s> <s> for linking your account to your current session. </s> <s> Lets get started </s> </speak>`
        speech: linkAccountObjResponses[index].before + conv.body.queryResult.parameters.accountName + linkAccountObjResponses[index].after
      }));
      return db.updateGoogleSessionIdForUser(conv.body.queryResult.parameters.accountName, conv.id);
    }
    let index = randomNumGen(errorResponses.length);
    conv.ask(new SimpleResponse({
      text: `Please try again`,
      // speech: `<speak> <p> <s> I'm sorry, I may have miss heard you. </s> <s> Could you try again? </s> </p> </speak>`
      speech: errorResponses[index]
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
      
      let index = randomNumGen(startWorkoutObjResponses.length);
      
      conv.ask(new SimpleResponse({
        text: 'Let me know when you are ready to begin.',
        // speech: '<speak> <s> Let me know when you are ready to begin your ' + current.name + ' exercise and are in position. </s> </speak>'
        speech: startWorkoutObjResponses[index].before + current.name + startWorkoutObjResponses[index].after
      }));
      
    }
  })
  .catch(err => {
    console.error(err);
    let index = randomNumGen(errorResponses.length);
    conv.ask(new SimpleResponse({
      text: 'Something went wrong',
      // speech: `<speak> <p> I'm sorry something appears to have gone wrong. Please try again </p> </speak>`
      speech: errorResponses[index]
      
    }));
  })
});

app.intent('describe exercise', conv => {
  return db.getExerciseDescription(1)
    .then(({ description }) =>{
      conv.ask("<speak>" + description + "</speak>");
    })
  // conv.ask("<speak> This is the description for" + current.name +" </speak>");
  // conv.ask("<speak>" + current.description + "</speak>");
});

app.intent('take a break', conv => {
  conv.close(`Okay, we will pick this up again later`);
})

app.intent('next exercise', conv => {
  console.log(conv.id, " conv.id inside of the next exercise intent");
  
  return db.getUserInfoByGoogleSessionId(conv.id)
  .then(user => {
    if (user !== undefined) {
      if (current !== undefined){
        let index = randomNumGen(nextExerObjResponses.length);
        // let cadence = `<speak> <s> The recommended pace for ${current.name} is ${current.rep_time / 1000} seconds. </s> <s> Let's begin </s> <break time="500ms"/>`;
        let cadence = nextExerObjResponses[index].part1.before + current.name + nextExerObjResponses[index].part1.prep + (current.rep_time / 1000) + nextExerObjResponses[index].part1.after;
        for (let i = 1; i < 11; i++) {
          cadence += ` give me a ${i} <break time="${current.rep_time}ms"/>`;
        }
        // cadence += ` <s> Lets take a break.</s> <s> Let me know when you are ready to do another set </s> <s> Or if you want to start ${googleWorkout[0].name}, we can do that as well</s> </speak>`;
        cadence += nextExerObjResponses[index].part2.before + googleWorkout[0].name + nextExerObjResponses[index].part2.after;
        conv.ask(new SimpleResponse({
          text: `Try and keep pace`,
          speech: cadence
        }));
      }
    } else {

      conv.ask(new SimpleResponse({
        test: 'Please link your session with your account.',
        speech: `<speak> <p> I am sorry but we need to connect you to your account. </p> <p> All you have to do is say link my account <break time"50ms"/> followed by your account name </p> </speak>`
      }));
    }
  })
  .catch(err => {
    let index = randomNumGen(errorResponses);
    console.log(err);
    conv.ask(new SimpleResponse({
      text: 'Something went wrong',
      // speech: `<speak> <p> <s> I'm sorry something appears to have gone wrong. </s> Please try again </p> </speak>`
      speech: errorResponses[index]
    }));
    })
  });
app.intent('take a break', conv => {

});
app.intent('Default Fallback Intent', conv => {
  let index = randomNumGen(errorResponses);
  conv.ask(errorResponses[index]);
});

module.exports = app;