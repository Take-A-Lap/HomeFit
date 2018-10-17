const spanishErrorResponse = [`<speak> <p> <s> Lo siento mucho, no te puedo entender. </s> <s> <prosody pitch="+10%"> ¿Podrías preguntarme otra vez? </prosody> </s> </p> </speak>`,
`<speak> <p> <s> Perdóname, no te entiendo. </s> <s> <prosody pitch="+10%"> ¿Puedes repetirlo, por favor?</prosody> </s> </p> </speak>`,
`<speak> <p> <s> Me avergüenza decir, </s>  <s> pero te he entendí mal. </s> <s> Repitalo, por favor. </s> </p> </speak>`,
`<speak> <p> <s> Perdón, </s> <s> dígame otra vez. </s> </p> </speak>`];

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

const linkAccountObjResponses = [
  {
    before: '<speak> <s> Gracias </s> </s>',
    after: '</s>, <s> por conectar a tu cuenta a la sessión actual. </s> <s> Empezamos. </s> </speak>'
  },
  {
    before: '<speak> <s> Disculpas, por la molestia, </s>',
    after: '<break time="750ms" /> <s> Hemos conectado a tu cuenta a la sessión actual con nosotros. </s> </speak>'
  },
  {
    before: '',
    after: ''
  }
];

module.exports = {
  spanishErrorResponse
}