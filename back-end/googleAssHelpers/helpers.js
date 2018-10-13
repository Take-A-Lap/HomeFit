const {
  dialogflow,
  Image,
} = require('actions-on-google')

const app = dialogflow();

app.intent('Default Fallback Intent', conv => {
  conv.ask(`I didn't understand. Can you tell me something else?`)
});

module.exports = app;