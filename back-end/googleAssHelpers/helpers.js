const {
  dialogflow,
  SimpleResponse
} = require('actions-on-google')
const db = require('../database/dbHelpers');
const workout = require('../Algorithms/workout.js');
const { spanishErrorResponse, spanishLinkAccountObjResponsesFeminine, spanishLinkAccountObjResponsesMasculine, spanishNextExerObjResponsesFeminine, spanishNextExerObjResponsesMasculine, spanishGreetings, spanishStartWorkoutObjResponsesFeminine, spanishStartWorkoutObjResponsesMasculine } = require('./spnResponse');
const { greetings, nextExerObjResponses, startWorkoutObjResponses, linkAccountObjResponses, errorResponses} = require('./engResponse');
let googleWorkout = [];
let current;
const randomNumGen = (numOptions) => {
  return Math.floor(Math.random() * numOptions);
};
const app = dialogflow();



app.intent('Default Welcome Intent', conv =>{
  console.log(conv.user)
  if (conv.user.raw.locale.slice(0, 2) === 'es') {
    let index = randomNumGen(spanishGreetings.length);
    conv.ask(spanishGreetings[index]);
  } else {
    let index = randomNumGen(greetings.length);
    console.log(index, ' greetings response index');

    // console.log(conv.user.raw.locale, ' this is should be a this is the user property')
    
    conv.ask(greetings[index]);

  }
});

app.intent('link account', conv => {
  if (conv.user.raw.locale.slice(0, 2) === 'es') {
    console.log(conv.body.queryResult.parameters.accountName);
    
    return db.getUserInfoByName(conv.body.queryResult.parameters.accountName)
      .then(user => {
        if (user !== undefined) {
          if (user.sex === 'm') {
            let index = randomNumGen(spanishLinkAccountObjResponsesFeminine.length);
            conv.ask(new SimpleResponse({
              text: `Gracias!`,
              // speech: `<speak> <s> Thank you </s> <s> ${conv.body.queryResult.parameters.accountName} </s> <s> for linking your account to your current session. </s> <s> Lets get started </s> </speak>`
              speech: spanishLinkAccountObjResponsesFeminine[index].before + conv.body.queryResult.parameters.accountName + spanishLinkAccountObjResponsesFeminine[index].after
            }));
            return db.updateGoogleSessionIdForUser(conv.body.queryResult.parameters.accountName, conv.id);
          } else if (user.sex === 'f') {
            let index = randomNumGen(spanishLinkAccountObjResponsesFeminine.length);
            conv.ask(new SimpleResponse({
              text: `Gracias!`,
              // speech: `<speak> <s> Thank you </s> <s> ${conv.body.queryResult.parameters.accountName} </s> <s> for linking your account to your current session. </s> <s> Lets get started </s> </speak>`
              speech: spanishLinkAccountObjResponsesFeminine[index].before + conv.body.queryResult.parameters.accountName + spanishLinkAccountObjResponsesFeminine[index].after
            }));
            return db.updateGoogleSessionIdForUser(conv.body.queryResult.parameters.accountName, conv.id);
          }
        }
        let index = randomNumGen(spanishErrorResponse.length);
        conv.ask(new SimpleResponse({
          text: `Por favor, intenta de nuevo`,
          // speech: `<speak> <p> <s> I'm sorry, I may have miss heard you. </s> <s> Could you try again? </s> </p> </speak>`
          speech: spanishErrorResponse[index]
        }));
      });
  } else {
    return db.getUserInfoByName(conv.body.queryResult.parameters.accountName)
    .then(user => {
      if(user !== undefined){
        let index = randomNumGen(linkAccountObjResponses.length);
        console.log(index, ' link account response index');
        conv.ask(new SimpleResponse({
          text: `Thank You!`,
          // speech: `<speak> <s> Thank you </s> <s> ${conv.body.queryResult.parameters.accountName} </s> <s> for linking your account to your current session. </s> <s> Lets get started </s> </speak>`
          speech: linkAccountObjResponses[index].before + conv.body.queryResult.parameters.accountName + linkAccountObjResponses[index].after
        }));
        return db.updateGoogleSessionIdForUser(conv.body.queryResult.parameters.accountName, conv.id);
      }
      let index = randomNumGen(errorResponses.length);
      console.log(index, ' error response index');
      conv.ask(new SimpleResponse({
        text: `Please try again`,
        // speech: `<speak> <p> <s> I'm sorry, I may have miss heard you. </s> <s> Could you try again? </s> </p> </speak>`
        speech: errorResponses[index]
      }));
    });
  }
});


app.intent('start workout', conv => {
  if (conv.user.raw.locale.slice(0, 2) === 'es') {
    return db.getUserInfoByGoogleSessionId(conv.id)
      .then(user => {
        if (user !== undefined) {
          const squatComf = user.squat_comf;
          const numWorkouts = user.workout_completes;
          return workout.generateWorkout(numWorkouts, squatComf);
        } else {
          conv.ask(new SimpleResponse({
            text: 'Por favor, conecta a su cuenta a la sesión.',
            speech: `<speak> <p> Lo siento, pero tenemos que conectar usted a su cuenta.</p> <p> Para conectar a su cuenta, solamente necesita decir conecta a mi cuenta seguido por el nombre de la cuenta. </p> </speak>`
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
          // console.log(current, ' this should the current workout object');

          let index = randomNumGen(spanishStartWorkoutObjResponsesMasculine.length);

          conv.ask(new SimpleResponse({
            text: 'Avísame cuando esté listo de empezar.',
            // speech: '<speak> <s> Let me know when you are ready to begin your ' + current.name + ' exercise and are in position. </s> </speak>'
            speech: spanishStartWorkoutObjResponsesMasculine[index].before + current.name + spanishStartWorkoutObjResponsesMasculine[index].after
          }));

        }
      })
      .catch(err => {
        console.error(err);
        let index = randomNumGen(spanishErrorResponse.length);
        conv.ask(new SimpleResponse({
          text: 'Fue un problema',
          // speech: `<speak> <p> I'm sorry something appears to have gone wrong. Please try again </p> </speak>`
          speech: spanishErrorResponse[index]

        }));
      })
    // conv.ask(`Hola, mi llamo alexa`);
  } else {

    // console.log(conv.id, ' conv.id inside the start workout intent');
    // need to remember to grab the conversation id
    return db.getUserInfoByGoogleSessionId(conv.id)
    .then(user => {
      if (user !== undefined) {
        const squatComf = user.squat_comf;
        const numWorkouts = user.workout_completes;
        return workout.generateWorkout(numWorkouts, squatComf);
      } else {
        conv.ask(new SimpleResponse({
          text: 'Please link your session with your account.',
          speech: `<speak> <p> I am sorry but we need to connect you to your account. </p> <p> All you have to do to link your account is say link my account followed by your account name </p> </speak>`
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
        // console.log(current, ' this should the current workout object');
        
        let index = randomNumGen(startWorkoutObjResponses.length);
        console.log(index, ' startWorkoutObjResponses response index');
        
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
  }
});

app.intent('describe exercise', conv => {
  if (conv.user.raw.locale.slice(0, 2) === 'es') {
    conv.ask(`Hola, mi llamo alexa`);
  } else {

    return db.getExerciseDescription(24)
      .then(({ description }) =>{
        
        conv.ask('<speak> <prosody pitch="+16%"> ' + description + " </prosody> </speak>");
      })
    // conv.ask("<speak> This is the description for" + current.name +" </speak>");
    // conv.ask("<speak>" + current.description + "</speak>");
  }
});

app.intent('take a break', conv => {
  if (conv.user.raw.locale.slice(0, 2) === 'es') {
    conv.close(`De acuerdo, seguimos mas tarde.`);
  } else {
    conv.close(`Okay, we will pick this up again later`);
  }
})

app.intent('next exercise', conv => {
  // console.log(conv.id, " conv.id inside of the next exercise intent");
  if (conv.user.raw.locale.slice(0, 2) === 'es') {
    return db.getUserInfoByGoogleSessionId(conv.id)
      .then(user => {
        if (user !== undefined) {
          if (current !== undefined) {
            if (user.sex === 'm') {
            let index = randomNumGen(spanishNextExerObjResponsesMasculine.length);
            // let cadence = `<speak> <s> The recommended pace for ${current.name} is ${current.rep_time / 1000} seconds. </s> <s> Let's begin </s> <break time="500ms"/>`;
            let cadence = spanishLinkAccountObjResponsesMasculine[index].part1.before + current.name + spanishLinkAccountObjResponsesMasculine[index].part1.prep + (current.rep_time / 1000) + spanishLinkAccountObjResponsesMasculine[index].part1.after;
            for (let i = 1; i < 11; i++) {
              cadence += ` dame ${i} <break time="${current.rep_time}ms"/>`;
            }
            // cadence += ` <s> Lets take a break.</s> <s> Let me know when you are ready to do another set </s> <s> Or if you want to start ${googleWorkout[0].name}, we can do that as well</s> </speak>`;
            cadence += spanishLinkAccountObjResponsesMasculine[index].part2.before + googleWorkout[0].name + spanishLinkAccountObjResponsesMasculine[index].part2.after;
            console.log(index, ' spanishLinkAccountObjResponsesMasculine response index');

            conv.ask(new SimpleResponse({
              text: `Intenta mantener el ritmo`,
              speech: cadence
            }));
          }
          if (user.sex === 'f') {
            let index = randomNumGen(spanishLinkAccountObjResponsesFeminine.length);
            // let cadence = `<speak> <s> The recommended pace for ${current.name} is ${current.rep_time / 1000} seconds. </s> <s> Let's begin </s> <break time="500ms"/>`;
            let cadence = spanishLinkAccountObjResponsesFeminine[index].part1.before + current.name + spanishLinkAccountObjResponsesFeminine[index].part1.prep + (current.rep_time / 1000) + spanishLinkAccountObjResponsesFeminine[index].part1.after;
            for (let i = 1; i < 11; i++) {
              cadence += ` dame ${i} <break time="${current.rep_time}ms"/>`;
            }
            // cadence += ` <s> Lets take a break.</s> <s> Let me know when you are ready to do another set </s> <s> Or if you want to start ${googleWorkout[0].name}, we can do that as well</s> </speak>`;
            cadence += spanishLinkAccountObjResponsesFeminine[index].part2.before + googleWorkout[0].name + spanishLinkAccountObjResponsesFeminine[index].part2.after;
            console.log(index, ' spanishLinkAccountObjResponsesFeminine response index');

            conv.ask(new SimpleResponse({
              text: `Intenta mantener el ritmo`,
              speech: cadence
            }));
          }
          } else {

          }
        } else {

          conv.ask(new SimpleResponse({
            test: 'Por favor, vincula su sesión con su cuenta.',
            speech: `<speak> <p> Perdon, pero tenemos que conectarle con su cuenta. </p> <p> Por favor, diga conecta a mi cuenta <break time"50ms"/> seguido por el nombre de su cuenta. </p> </speak>`
          }));
        }
      })
      .catch(err => {
        let index = randomNumGen(spanishErrorResponse);
        console.log(err);
        conv.ask(new SimpleResponse({
          text: 'Hay un problema',
          // speech: `<speak> <p> <s> I'm sorry something appears to have gone wrong. </s> Please try again </p> </speak>`
          speech: spanishErrorResponse[index]
        }));
      })
    // conv.ask(`Hola, mi llamo alexa`);
  } else {

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
          console.log(index, ' nextExerObjResponses response index');

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
    }
});

app.intent('Default Fallback Intent', conv => {
  if (conv.user.raw.locale.slice(0, 2) === 'es') {
    conv.ask(`Hola, mi llamo alexa`);
  } else {
    let index = randomNumGen(errorResponses);
    conv.ask(new SimpleResponse({
        text: 'Something went wrong',
        // speech: `<speak> <p> <s> I'm sorry something appears to have gone wrong. </s> Please try again </p> </speak>`
        speech: errorResponses[index]
      }));
  }
});

module.exports = app;
