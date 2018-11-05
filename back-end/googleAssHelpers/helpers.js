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
let hasRun = false;
let lastUserExercise;
const randomNumGen = (numOptions) => {
  return Math.floor(Math.random() * numOptions);
};
const app = dialogflow();



app.intent('Default Welcome Intent', conv =>{
  if (conv.user.raw.locale.slice(0, 2) === 'es') {
    let index = randomNumGen(spanishGreetings.length);
    conv.ask(spanishGreetings[index]);
  } else {
    let index = randomNumGen(greetings.length);
    console.log(index, ' greetings response index');

    
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
              speech: spanishLinkAccountObjResponsesFeminine[index].before + conv.body.queryResult.parameters.accountName + spanishLinkAccountObjResponsesFeminine[index].after
            }));
            return db.updateGoogleSessionIdForUser(conv.body.queryResult.parameters.accountName, conv.id);
          } else if (user.sex === 'f') {
            let index = randomNumGen(spanishLinkAccountObjResponsesFeminine.length);
            conv.ask(new SimpleResponse({
              text: `Gracias!`,
              speech: spanishLinkAccountObjResponsesFeminine[index].before + conv.body.queryResult.parameters.accountName + spanishLinkAccountObjResponsesFeminine[index].after
            }));
            return db.updateGoogleSessionIdForUser(conv.body.queryResult.parameters.accountName, conv.id);
          }
        }
        let index = randomNumGen(spanishErrorResponse.length);
        conv.ask(new SimpleResponse({
          text: `Por favor, intenta de nuevo`,
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
          speech: linkAccountObjResponses[index].before + conv.body.queryResult.parameters.accountName + linkAccountObjResponses[index].after

        }));
        return db.updateGoogleSessionIdForUser(conv.body.queryResult.parameters.accountName, conv.id);
      }
      let index = randomNumGen(errorResponses.length);
      console.log(index, ' error response index');
      conv.ask(new SimpleResponse({
        text: `Please try again`,
        speech: errorResponses[index]
      }));
    });
  }
});


app.intent('start workout', conv => {
  console.log('inside the start workout intent at the beginning');

  if (conv.user.raw.locale.slice(0, 2) === 'es') {
    let gender = null;
    return db.getUserInfoByGoogleSessionId(conv.id)
      .then(user => {
        if (user !== undefined) {
          gender = user.sex;
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
      .then((genWorkout) => {
        if (genWorkout !== undefined) {
          googleWorkout = googleWorkout.length > 0 ? googleWorkout : genWorkout;
          return googleWorkout.splice(0, 1);
        }
      })
      .then(([currentExercise]) => {
        if (currentExercise !== undefined) {
          current = currentExercise;

          let index = randomNumGen(spanishStartWorkoutObjResponsesMasculine.length);

          conv.ask(new SimpleResponse({
            text: 'Avísame cuando esté listo de empezar.',
            speech: spanishStartWorkoutObjResponsesMasculine[index].before + current.nombre + spanishStartWorkoutObjResponsesMasculine[index].after
          }));

        }
      })
      .catch(err => {
        console.error(err);
        let index = randomNumGen(spanishErrorResponse.length);
        conv.ask(new SimpleResponse({
          text: 'Fue un problema',
          speech: spanishErrorResponse[index]

        }));
      })
  } else {

    console.log('inside the start workout intent');
    // need to remember to grab the conversation id
    return db.getUserInfoByGoogleSessionId(conv.id)
    .then(user => {
      if (user !== undefined) {
        const squatComf = user.squat_comf;
        const numWorkouts = user.workout_completes;
        lastUserExercise = user.last_exercise_id;
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
        if(!hasRun && !lastUserExercise){
          googleWorkout.unshift(lastUserExercise);
          hasRun = true;
        }
        if(googleWorkout[0] === null){
          googleWorkout.splice(0, 1);
        }
        return googleWorkout.splice(0, 1);
      }
    })
    .then(([currentExercise]) => {
      if (currentExercise !== undefined && typeof currentExercise !== 'number') {
        current = currentExercise;
        
        let index = randomNumGen(startWorkoutObjResponses.length);
        console.log(index, ' startWorkoutObjResponses response index');
        
        conv.ask(new SimpleResponse({
          text: 'Let me know when you are ready to begin.',
          speech: startWorkoutObjResponses[0].before + current.name + startWorkoutObjResponses[0].after
        }));
        
      } else {
        return db.getExerciseById(currentExercise);
      }
    })
    .then((currentExercise) =>{

      if (currentExercise !== undefined) {
        [currentExercise] = currentExercise;
        current = currentExercise;

        let index = randomNumGen(startWorkoutObjResponses.length);
        console.log(index, ' startWorkoutObjResponses response index');

        conv.ask(new SimpleResponse({
          text: 'Let me know when you are ready to begin.',
          speech: startWorkoutObjResponses[index].before + current.name + startWorkoutObjResponses[index].after
        }));
      }
    })
    .catch(err => {
      console.error(err);
      let index = randomNumGen(errorResponses.length);
      conv.ask(new SimpleResponse({
        text: 'Something went wrong',
        speech: errorResponses[index]
        
      }));
    })
  }
});

app.intent('describe exercise', conv => {
  console.log('inside the describe intent');
  if (conv.user.raw.locale.slice(0, 2) === 'es') {
    conv.ask(`<speak> ${current.spanish_description} </speak>`);
  } else {
    if(current !== undefined){

      conv.ask('<speak> <prosody pitch="+16%"> ' + current.description + ' </prosody> <p><prosody pitch="+12%"><s> Now that you know how to do ' + current.name + '</s><s> We can get going whenever you are ready or we can go over how to perform the workout again. </s> </prosody></p></speak>');
    } else {
      conv.ask(`
      <speak>
        <prosody pitch="-5%">
          <s>
            I will need you to have started your workout routine in order to describe to you what workout you will be doing.
          </s>
        </prosody>
      </speak>`);
    }
  }
});

app.intent('take a break', conv => {
  hasRun = false;
  if (conv.user.raw.locale.slice(0, 2) === 'es') {
    conv.close(`De, acuerdo, seguimos más tarde.`);
  } else {
    db.getUserInfoByGoogleSessionId(conv.id)
    .then((user) => {
      console.log(current.id, ' the current exercise id that should be updating the database');
      
      return db.updateLastWO((user.id, current.id));
    })
    .then(() => {
      console.log('added current workout to user profile before ending session');
    })
    .catch(err => {
      console.error(err);
    })
    conv.close(`Okay, we will pick this up again later`);
  }
})

app.intent('next exercise', conv => {
  console.log('inside the next intent');

  if (conv.user.raw.locale.slice(0, 2) === 'es') {
    return db.getUserInfoByGoogleSessionId(conv.id)
      .then(user => {
        if (user !== undefined) {
          if (current !== undefined) {
            if (user.sex === 'm') {
            let index = randomNumGen(spanishNextExerObjResponsesMasculine.length);
            console.log(spanishNextExerObjResponsesMasculine[index].part2.before, 'spanishNextExerObjResponsesM[index].part2');
            
              let cadence = spanishNextExerObjResponsesMasculine[0].part1.before + current.nombre + spanishNextExerObjResponsesMasculine[0].part1.prep + (current.rep_time / 1000) + spanishNextExerObjResponsesMasculine[0].part1.after;
            for (let i = 1; i < 11; i++) {
              cadence += ` dame ${i} <break time="${current.rep_time}ms"/>`;
            }
            cadence += spanishNextExerObjResponsesMasculine[index].part2.before + googleWorkout[0].nombre + spanishNextExerObjResponsesMasculine[index].part2.after;
            console.log(index, ' spanishNextExerObjResponsesMasculine response index');

            conv.ask(new SimpleResponse({
              text: `Intenta mantener el ritmo`,
              speech: cadence
            }));
          }
          if (user.sex === 'f') {
            let index = randomNumGen(spanishNextExerObjResponsesFeminine.length);
            let cadence = spanishNextExerObjResponsesFeminine[index].part1.before + current.nombre + spanishLinkAccountObjResponsesFeminine[index].part1.prep + (current.rep_time / 1000) + spanishNextExerObjResponsesFeminine[index].part1.after;
            for (let i = 1; i < 11; i++) {
              cadence += ` dame ${i} <break time="${current.rep_time}ms"/>`;
            }
            cadence += spanishNextExerObjResponsesFeminine[index].part2.before + googleWorkout[0].nombre + spanishNextExerObjResponsesFeminine[index].part2.after;
            console.log(index, ' spanishNextExerObjResponsesFeminine response index');

            conv.ask(new SimpleResponse({
              text: `Intenta mantener el ritmo`,
              speech: cadence
            }));
          }
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
        console.error(err);
        conv.ask(new SimpleResponse({
          text: 'Hay un problema',
          speech: spanishErrorResponse[index]
        }));
      })
  } else {

    return db.getUserInfoByGoogleSessionId(conv.id)
    .then(user => {
      if (user !== undefined) {
        if (current !== undefined){
          let index = randomNumGen(nextExerObjResponses.length);
          let cadence = nextExerObjResponses[index].part1.before + current.name + nextExerObjResponses[index].part1.prep + (current.rep_time / 1000) + nextExerObjResponses[index].part1.after;
          for (let i = 1; i < 11; i++) {
            cadence += ` give me a ${i} <break time="${current.rep_time}ms"/>`;
          }
          cadence += nextExerObjResponses[index].part2.before + googleWorkout[0].name + nextExerObjResponses[index].part2.after;
          console.log(index, ' nextExerObjResponses response index');

          conv.ask(new SimpleResponse({
            text: `Try and keep pace`,
            speech: cadence
          }));
          return db.updateVoiceInterfaceSets(user.id, user.voice_interface_sets + 1);
        } else {
          conv.ask(`
          <speak>
            <prosody pitch="-5%">
              <s>
                You will need to begin your workout in order for me to count down your current exercise
              </s>
            </prosody>
          </speak>
          `);
        }
      } else {
  
        conv.ask(new SimpleResponse({
          test: 'Please link your session with your account.',
          speech: `<speak> <p> I am sorry but we need to connect you to your account. </p> <p> All you have to do is say link my account <break time"50ms"/> followed by your account name </p> </speak>`
        }));
      }
    })
    .then(()=>{
      console.log('voice_interface_sets has been updated')
    })
    .catch(err => {
      let index = randomNumGen(errorResponses);
      console.error(err);
      conv.ask(new SimpleResponse({
        text: 'Something went wrong',
        speech: errorResponses[index]
      })); 
      })
    }
});

app.intent('Default Fallback Intent', conv => {
  console.log('inside the fallback intent');

  if (conv.user.raw.locale.slice(0, 2) === 'es') {
    let index = randomNumGen(spanishErrorResponse);
    conv.ask(new SimpleResponse({
      text: 'Perdón, hemos tenido un problema',
      speech: spanishErrorResponse[index]
    }));
  } else {
    let index = randomNumGen(errorResponses);
    conv.ask(new SimpleResponse({
        text: 'Something went wrong',
        speech: errorResponses[index]
      }));
  }
});

module.exports = app;
