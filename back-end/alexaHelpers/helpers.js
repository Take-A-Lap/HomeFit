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
  reprompt = "<speak>" + reprompt + "</speak>";
  const jsonObj = {
    "version": "1.0",
    "response": {
      "shouldEndSession": shouldSessionEnd,
      "outputSpeech": {
        "type": "SSML",
        "ssml": speechOutput
      },
    },
    "card": {
      "type": "Simple",
      "title": SKILL_NAME,
      "content": cardText,
      "text": cardText
    },
    "reprompt": {
      "outputSpeech": {
        "type": "SSML",
        "text": reprompt,
        "ssml": reprompt
      }
    }
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
  // start workout and first exercise
  initWorkout: (workout, count) => {
    if(typeof workout !== "object"){
      return buildResponse("<p> That's all for today </p> <s> We can pick up again tomorrow </s> You can also check out your suggested recipes at e dot home fit do dot com");
    }
    const speechOutput = count === 0 ? "<s>Let's begin the day with some " + workout.name + "</s> <p>I'll give you a moment to get ready. </p>" 
      : '<s> Next up is ' + workout.name + '</s> <s> Let me know when you are ready to begin.</s>';
    const response = buildResponseWithPrompt(speechOutput, false, "TODO", "Are you ready to begin your workout today?");
    return response;
  },
  // move on to the next exercise
  coachExercise: (workout) => {
    console.log(workout, ' --- what is this? alexa needs to know');
    if(workout === undefined){
      const speechOutput = "<p> <s>That is it for this exercise.</s> Let me know when you want to start the next exercise. </p>";
      const response = buildResponse(speechOutput, false, "Next exercise");
      return response;
    }
    if (typeof workout[0] !== "object") {
      return buildResponse("<p> That's all for today </p> <s> We can pick up again tomorrow </s> You can also check out your suggested recipes at e dot home fit do dot com");
    }
    let cadence = '<s> The pace I will be counting your reps will be ' + workout[0].rep_time / 1000 + ' seconds </s>';
    for (let i = 1; i < 11; i++) {
      cadence += ' give me a ' + i + ' <break time="' + workout[0].rep_time + 'ms"/> ';
    }
    const speechOutput = "<p> I will count the reps,</p> " + cadence;
    const response = buildResponse(speechOutput, false, "TODO");
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
  default: () => {
    // TODO: figure out how to implement
    const speechOutput = "I'm sorry, i don't believe i heard you, could you try again?"
    const response = buildResponse(speechOutput, false, "Oops, sorry");
    return response;
  },

  endSession: () => {
    const speechOutput = "Good bye";
    const response = buildResponse(speechOutput, true, "Goodbye");
    return response;
  },

  help: () => {
    const speechOutput = "<p>If you want me to begin our workout together try says </p> <p> I would like to begin my workout </p>";
    const response = buildResponse(speechOutput, false, "How can I help?");
    return response;
  },

  PLACEHOLDER: () => {
    const speechOutput = "<s>As this skill is currently in beta test mode,</s><s> some features are still being worked on.</s> Feel free to continue to use me for your workout needs while my developers continue to improve me.";
    const response = buildResponse(speechOutput, false, "This is a test");
    return response;
  }

};