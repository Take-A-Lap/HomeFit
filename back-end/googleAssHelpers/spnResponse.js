const spanishErrorResponse = [`<speak> <p> <s> Lo siento mucho, no le puedo entender. </s> <s> <prosody pitch="+10%"> ¿Podría preguntarme otra vez? </prosody> </s> </p> </speak>`,
`<speak> <p> <s> Perdóname, no le entiendo. </s> <s> <prosody pitch="+10%"> ¿Puede repetirlo, por favor?</prosody> </s> </p> </speak>`,
`<speak> <p> <s> Me avergüenza decir, </s>  <s> pero le he entendí mal. </s> <s> Repitalo, por favor. </s> </p> </speak>`,
`<speak> <p> <s> Perdón, </s> <s> dígame otra vez. </s> </p> </speak>`];

const linkAccountObjResponsesMasculine = [
  {
    before: '<speak> <s> Gracias </s> <s>',
    after: '</s>, <s> por conectar a su cuenta a la sesión actual. </s> <s> Empezamos. </s> </speak>'
  },
  {
    before: '<speak> <s> Disculpa, por la molestia, </s> <p> <s>',
    after: '</s> </p> <break time="750ms" /> <s> Hemos conectado a tu cuenta a la sesión actual con nosotros. </s> <s> Empezaremos con la sesión de ejecisio de hoy. </s> </speak>'
  },
  {
    before: '<speak> <s> Bueno, </s> <p> <s>',
    after: '</s> </p> <s> Todo bien, </s> <s> Empezamos con los ejercisios. </s> </speak>'
  },
  {
    before: '<speak> <s> Me alegra de verte ',
    after: '</s> <s> si estés list`o, podemos empezar con los ejercisios de hoy. </s> </speak>'
  }
];

const linkAccountObjResponsesFeminine = [
  {
    before: '<speak> <s> Gracias </s> <s>',
    after: '</s>, <s> por conectar a su cuenta a la sesión actual. </s> <s> Empezamos. </s> </speak>'
  },
  {
    before: '<speak> <s> Disculpa, por la molestia, </s> <p> <s>',
    after: '</s> </p> <break time="750ms" /> <s> Hemos conectado a su cuenta a la sesión actual con nosotros. </s> <s> Empezaremos con la sesión de ejecisio de hoy. </s> </speak>'
  },
  {
    before: '<speak> <s> Bueno, </s> <p> <s>',
    after: '</s> </p> <s> Todo bien, </s> <s> Empezamos con los ejercisios. </s> </speak>'
  },
  {
    before: '<speak> <s> Me alegra de verle ',
    after: '</s> <s> si estés lista, podemos empezar con los ejercisios de hoy. </s> </speak>'
  }
];

module.exports = {
  spanishErrorResponse,
  linkAccountObjResponsesMasculine,
  linkAccountObjResponsesFeminine
}