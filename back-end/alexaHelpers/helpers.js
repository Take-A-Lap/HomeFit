const SKILL_NAME = "Alexa Fitness Trainer";

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
      }
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
  }
  return jsonObj;
};

module.exports = {
  invocationIntent: () => {
    const greetingSpeech = "Welcome to Alexa Fitness Trainer. When you are ready to begin your workout just let me know, or if you rather check out what I recommend you eat for the day you can ask me that as well. So what would you like to do?"
    const response = buildResponseWithPrompt(greetingSpeech, false, "Welcome", "Are you ready?");
    console.log(response, ' line 58 alexa helper file');
    return response;
  },

  stopAndExit: () => {
    const speechOutput = "Hope you enjoyed your workout experience, see you next time. Buh bye";
    const response = buildResponse(speechOutput, true, "");
    return response;
  },

  

};