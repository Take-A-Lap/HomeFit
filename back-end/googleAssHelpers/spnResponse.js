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
    before: '<speak> <s> Me alegra de oírle ',
    after: '</s> <s> si esté listo, podemos empezar con los ejercisios de hoy. </s> </speak>'
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
    before: '<speak> <s> Me alegra de oírle ',
    after: '</s> <s> si esté lista, podemos empezar con los ejercisios de hoy. </s> </speak>'
  }
];

const startWorkoutObjResponsesMasculine = [
  {
    before: '<speak> <s> Avísame cuando esté listo de empezar su ',
    after: ' e en posición. </s> </speak>'
  },
  {
    before: '<speak> <s> Hacemos ',
    after: '</s> <s> Dígame cuando esté listo. </s></speak>'
  },
  {
    before: '<speak> <s> <prosody pitch="+20%" ><empasis level="reduced"> Vale </emphasis></prosody> </s><s> Seguimos con ',
    after: '</s> </speak>'
  },
  {
    before: '<speak> <s> Es la hora de seguir, </s> <s> Comenzamos el siguiente ejercisio',
    after: '</s> </speak>'
  }
];

const startWorkoutObjResponsesFeminine = [
  {
    before: '<speak> <s> Avísame cuando esté listo de empezar su ',
    after: ' e en posición. </s> </speak>'
  },
  {
    before: '<speak> <s> Hacemos ',
    after: '</s> <s> Dígame cuando esté listo. </s></speak>'
  },
  {
    before: '<speak> <s> <prosody pitch="+20%" ><empasis level="reduced"> Vale </emphasis></prosody> </s><s> Seguimos con ',
    after: '</s> </speak>'
  },
  {
    before: '<speak> <s> Es la hora de seguir, </s> <s> Comenzamos el siguiente ejercisio',
    after: '</s> </speak>'
  }
];

module.exports = {
  spanishErrorResponse,
  linkAccountObjResponsesMasculine,
  linkAccountObjResponsesFeminine,
  startWorkoutObjResponsesMasculine,
  startWorkoutObjResponsesFeminine
}