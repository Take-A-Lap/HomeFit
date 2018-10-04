const buildResponse = (speechText, shouldSessionEnd, cardText) => {
  // TODO: create a way to build the response in json
};

const buildResponseWithPrompt = (speechText, shouldSessionEnd, cardText, reprompt) => {
  // TODO: create a way to build the response with a prompt in json
};

module.exports = {
  invocationIntent: () => {
    const greetingSpeech = 'Welcome to Alexa Fitness Trainer. When you are ready to begin your workout just let me know, or if you rather check out what I recommend you eat for the day you can ask me that as well. So what would you like to do?'
    // TODO: build this out to handle more
    return buildResponseWithPrompt(greetingSpeech, false, 'Welcome');
  }

};