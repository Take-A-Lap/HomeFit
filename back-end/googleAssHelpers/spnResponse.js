const spanishErrorResponse = [`<speak> <p> <s> Lo siento mucho, no le puedo entender. </s> <s> <prosody pitch="+10%"> ¿Podría preguntarme otra vez? </prosody> </s> </p> </speak>`,
`<speak> <p> <s> Perdóname, no le entiendo. </s> <s> <prosody pitch="+10%"> ¿Puede repetirlo, por favor?</prosody> </s> </p> </speak>`,
`<speak> <p> <s> Me avergüenza decir, </s>  <s> pero le he entendí mal. </s> <s> Repitalo, por favor. </s> </p> </speak>`,
`<speak> <p> <s> Perdón, </s> <s> dígame otra vez. </s> </p> </speak>`];

const spanishLinkAccountObjResponsesMasculine = [
  {
    before: '<speak> <s> Gracias </s> <s>',
    after: '</s>, <s> por conectar a su cuenta a la sesión actual. </s> <s> Empezamos. </s> </speak>'
  },
  {
    before: '<speak> <s> Disculpa, por la molestia, </s> <p> <s>',
    after: '</s> </p> <break time="750ms" /> <s> Hemos conectado a tu cuenta a la sesión actual con nosotros. </s> <s> Empezaremos con la sesión de entrenamiento de hoy. </s> </speak>'
  },
  {
    before: '<speak> <s> Bueno, </s> <p> <s>',
    after: '</s> </p> <s> Todo bien, </s> <s> Empezamos con el entrenamiento. </s> </speak>'
  },
  {
    before: '<speak> <s> Me alegra de oírle ',
    after: '</s> <s> si esté listo, podemos empezar con el entrenamiento de hoy. </s> </speak>'
  }
];

const spanishLinkAccountObjResponsesFeminine = [
  {
    before: '<speak> <s> Gracias </s> <s>',
    after: '</s>, <s> por conectar a su cuenta a la sesión actual. </s> <s> Empezamos. </s> </speak>'
  },
  {
    before: '<speak> <s> Disculpa, por la molestia, </s> <p> <s>',
    after: '</s> </p> <break time="750ms" /> <s> Hemos conectado a su cuenta a la sesión actual con nosotros. </s> <s> Empezaremos con la sesión de entrenamiento de hoy. </s> </speak>'
  },
  {
    before: '<speak> <s> Bueno, </s> <p> <s>',
    after: '</s> </p> <s> Todo bien, </s> <s> Empezamos con el entrenamiento. </s> </speak>'
  },
  {
    before: '<speak> <s> Me alegra de oírle ',
    after: '</s> <s> si esté lista, podemos empezar con el entrenamiento de hoy. </s> </speak>'
  }
];

const spanishStartWorkoutObjResponsesMasculine = [
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

const spanishStartWorkoutObjResponsesFeminine = [
  {
    before: '<speak> <s> Avísame cuando esté lista de empezar su ',
    after: ' e en posición. </s> </speak>'
  },
  {
    before: '<speak> <s> Hacemos ',
    after: '</s> <s> Dígame cuando esté lista. </s></speak>'
  },
  {
    before: '<speak> <s> <prosody pitch="+20%" ><emphasis level="reduced"> Vale </emphasis></prosody> </s><s> Seguimos con ',
    after: '</s> </speak>'
  },
  {
    before: '<speak> <s> Es la hora de seguir, </s> <s> Comenzamos el siguiente ejercisio',
    after: '</s> </speak>'
  }
];

const spanishNextExerObjResponsesMasculine = [
  {
    part1: {
      before: '<speak> <s> El rato recomendado por ',
      prep: 'es',
      after: ' segundos. </s> <s> Empezamos </s> <break time="500ms" />'
    },
    part2: {
      before: ' <s> Descansamos.</s> <s> Avísame cuando esté listo de hacer la siguiente colección </s> <s> o podemos empezar ahora ',
      after: ', si le gustaría </s> </speak>'
    }
  }
];

const spanishNextExerObjResponsesFeminine = [
  {
    part1: {
      before: '<speak> <s> El rato recomendado por ',
      prep: 'es',
      after: ' segundos. </s> <s> Empezamos </s> <break time="500ms" />'
    },
    part2: {
      before: ' <s> Descansamos.</s> <s> Avísame cuando esté listo de hacer la siguiente colección </s> <s> o podemos empezar ahora ',
      after: ', si le gustaría </s> </speak>'
    }
  }
]

const spanishGreetings = [
  `<speak>
    <p>
      <s>
        Bienvenidos al Entrenador de Home Fit.
      </s>
      <s> 
        El entrenador se creyó para sus necesidades personales.
      </s> 
    </p>
    <p>
      <s>
        Antes de empezemos
      </s>
      <s>
        Necesito que conecte nuestra sesión a su cuenta de Home Fit.
      </s>
      <s>
        Para hacerlo, solamente tiene que decir conecta a mi cuenta con el nombre de la cuenta.
      </s>
      <s>
        despues de ha conectado, podemas empezar el entrenamiento de hoy.
      </s>
    </p>
  </speak>`,
  `<speak> 
    <p>
      <prosody rate"fast" volume="+3db" pitch="+25st" >
        Hola
      </prosody>
    </p>
    <p>
      <prosody rate="fast" pitch="+15st">
        Tengo muchas ganas de hacer a nuestro entrenamiento hoy.
      </prosody>
    </p> 
    <p>
      <prosody rate="slow" pitch="-10st">
        <s>
          Sin embargo
        </s>
      </prosody>
      <s>
        No se olvide que necesitará conectar su nombre de usuario a nuestra sesión de hoy.
      </s>
      <s>
      Dígame conecta a mi cuenta e el nombre de la cuenta.
      </s>
    </p>
  </speak>`,
  `<speak>
    <p>
      ¿Como debo saludar a nuestros usarios Roger?
    </p>
  </speak>`,
  `<speak>
    <p>
      ¿Como debo saludar a nuestros usarios Josh?
    </p>
  </speak>`,
  `<speak>
    <p>
      ¿Como debo saludar a nuestros usarios Cornelius?
    </p>
  </speak>`,
  `<speak>
    <p>
      ¿Como debo saludar a nuestros usarios Alex?
    </p>
  </speak>`
];

module.exports = {
  spanishErrorResponse,
  spanishLinkAccountObjResponsesMasculine,
  spanishLinkAccountObjResponsesFeminine,
  spanishStartWorkoutObjResponsesMasculine,
  spanishStartWorkoutObjResponsesFeminine,
  spanishNextExerObjResponsesMasculine,
  spanishNextExerObjResponsesFeminine,
  spanishGreetings
}