const SKILL_NAME = "Fitness Trainer";

const buildResponse = (speechText, shouldSessionEnd, cardText) => {

  const speechOutput = "<speak>" + speechText + "</speak>";
  const jsonObj = {
    "version": "1.0",
    "response": {
      "shouldEndSession": shouldSessionEnd,
      "outputSpeech": {
        "type": "SSML",
        "ssml": speechOutput
      }
    },
    "card": {
      "type": "Simple",
      "title": SKILL_NAME,
      "content": cardText,
      "text": cardText
    },
  }
  return jsonObj;
};

const buildResponseWithPrompt = (speechText, shouldSessionEnd, cardText, reprompt) => {

  const speechOutput = "<speak>" + speechText + "</speak>";
  const jsonObj = {
    "version": "1.0",
    "response": {
      "shouldEndSession": shouldSessionEnd,
      "outputSpeech": {
        "type": "SSML",
        "ssml": speechOutput
      },
      "card": {
        "type": "Simple",
        "title": SKILL_NAME,
        "content": cardText,
        "text": cardText
      },
      "reprompt": {
        "outputSpeech": {
          "type": "PlainText",
          "text": reprompt,
          "ssml": reprompt
        }
      }
    },
  }
  return jsonObj;
};

module.exports = {
  invocationIntent: (name) => {
    console.log(name);
    let greetingSpeech = '';
    if (name === "not linked yet" || name === undefined){
      // says something to prompt the user to add their alexa id
      greetingSpeech = "It appears you have not linked your account yet. If you would like to link your account try saying, link my account followed by your username";
    } else {
      greetingSpeech = "Welcome back to Alexa Fitness Trainer " + name + ". When you are ready to begin your workout just let me know, or if you rather check out what I recommend you eat for the day you can ask me that as well. So what would you like to do?"
    }
    const response = buildResponseWithPrompt(greetingSpeech, false, "Welcome", "Are you ready?");
    return response;
  },

  stopAndExit: () => {
    const speechOutput = "Hope you enjoyed your workout experience, see you next time. Buh bye";
    const response = buildResponse(speechOutput, true, "Hope you enjoyed your workout experience, see you next time. Buh bye");
    return response;
  },

  startWorkout: () => {
    let cadence = '';
    for(let i = 1; i < 11; i++){
      cadence += ' give me a ' + i + ' <break time="1200ms"/> ';
    }
    const speechOutput = "Let's begin your workout. I would then say something realted to the workout and help you pace yourself by count your reps. this is an example for Tricep Pushup's, " + cadence;
    const response = buildResponseWithPrompt(speechOutput, false, "TODO", "Are you ready to begin your workout today?")
    return response;
  },

  linkAccount: (username) => {    
    const speechOutput = "It is a pleasure to meet you " + username + ". When you are ready to begin your workout, feel free to let me know. You can try saying begin workout";
    const response = buildResponse(speechOutput, false, "It is a pleasure to meet you");
    return response;
  },

  readWorkout: () => {
    const speechOutput = "This is where i would be able to read you the results of the workout you had just performed";
    response = buildResponse(speechOutput, false, "TODO")
    return response;
  },

  readRecipe: () => {
    const speechOutput = "This is where i would be able to read you the recommended recipe for the meal that is passed to me";
    response = buildResponse(speechOutput, false, "TODO");
    return response;
  },
  changeView: (view) =>{
    const speechOutput = "No problem, let me bring up the " + view + " page for you.";
    const response = buildResponse(speechOutput, false, "TODO");
    return response;
  },
  nextWorkout: () => {
    let cadence = '';
    for (let i = 1; i < 11; i++) {
      cadence += ' give me a ' + i + ' <break time="1700ms"/> ';
    }
    const speechOutput = "This is where i would then continue our workout to the next exercise. here is an example of Decline Pushups i will count the reps, " + cadence;
    const response = buildResponse(speechOutput, false, "TODO");
    return response;
  },
  default: () => {
    const speechOutput = "I'm sorry, i don't believe i heard you, could you try again?"
    const response = buildResponse(speechOutput, false, "Oops, sorry");
    return response;
  }

};