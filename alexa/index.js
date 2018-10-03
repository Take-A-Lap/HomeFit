const Alexa = require('ask-sdk-core');

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
  },
  handle(handlerInput) {
    const speechText = 'Welcome, my name is Alexa and I will be your physical trainer for the day, let me know when you are ready to begin.';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(speechText)
      .withSimpleCard('Ready to begin?', speechText)
      .getResponse();
  }
};

const StartWorkoutHandler ={
  canHandle(handlerInput) {

  },
  handle(handlerInput) {
    
  }
};


exports.handler = Alexa.SkillBuilders.custom()
  .addRequestHandlers(
    //handlers go here
    LaunchRequestHandler
  ).create();