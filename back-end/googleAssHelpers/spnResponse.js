const spanishErrorResponse = [`<speak> <p> <s> Lo siento mucho, no le puedo entender. </s> <s> Podría preguntarme otra vez?  </s> </p> </speak>`,
`<speak> <p> <s> Perdóname, no le entiendo. </s> <s> Puede repetirlo, por favor? </s> </p> </speak>`,
`<speak> <p> <s> Disculpe, pero sign sin entenderle </s> <s> Repitalo, por favor. </s> </p> </speak>`,
`<speak> <p> <s> Perdón, </s> <s> dígamelo otra vez. </s> </p> </speak>`];

const spanishLinkAccountObjResponsesMasculine = [
  {
    before: '<speak> <s> Gracias </s> <s>',
    after: '</s>, <s> por conectar a su cuenta a la sesión actual. </s> <s> Empezamos. </s> </speak>'
  },
  {
    before: '<speak> <s> Disculpa, por la molestia, </s> <p> <s>',
    after: '</s> </p> <break time="750ms" /> <s> Hemos conectado su cuenta a la sesión actual con nosotros. </s> <s> Empezaremos con la sesión de entrenamiento de hoy. </s> </speak>'
  },
  {
    before: '<speak> <s> Bueno, </s> <p> <s>',
    after: '</s> </p> <s> Todo bien, </s> <s> Empezamos con el entrenamiento. </s> </speak>'
  },
  {
    before: '<speak> <s> Me alegra saber de usted',
    after: '</s> <s> si está listo, podemos empezar con el entrenamiento de hoy. </s> </speak>'
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
    before: '<speak> <s> Avísame cuando esté listo para empezar su ',
    after: ' en posición. </s> </speak>'
  },
  {
    before: '<speak> <s> Hacemos ',
    after: '</s> <s> Dígame cuando esté listo. </s></speak>'
  },
  {
    before: '<speak> <s> Vale </s><s> Seguimos con ',
    after: '</s> </speak>'
  },
  {
    before: '<speak> <s> Es hora de seguir, </s> <s> Comenzamos el siguiente ejercicio',
    after: '</s> </speak>'
  }
];

const spanishStartWorkoutObjResponsesFeminine = [
  {
    before: '<speak> <s> Avísame cuando esté lista de empezar su ',
    after: ' en posición. </s> </speak>'
  },
  {
    before: '<speak> <s> Hacemos ',
    after: '</s> <s> Dígame cuando esté lista. </s></speak>'
  },
  {
    before: '<speak> <s> Vale </s><s> Seguimos con ',
    after: '</s> </speak>'
  },
  {
    before: '<speak> <s> Es hora de seguir, </s> <s> Comenzamos el siguiente ejercisio',
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
      before: ' <s> Descansamos.</s> <s> Avísame cuando esté listo para hacer la siguiente colección </s> <s> o podemos empezar ahora ',
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
  `
  <voice gender="male">
  <speak>
    <p>
      <s>
        Bienvenidos al Entrenador de Home Fit.
      </s>
    </p>
    <p>
      <s>
        Antes de empezar
      </s>
      <s>
        Necesito que conecte nuestra sesión a su cuenta de Home Fit.
      </s>
      <s>
        Para hacerlo, solamente tiene que decir conecta a mi cuenta con el nombre de la cuenta.
      </s>
      <s>
        despues de que se conecte, podemos empezar el entrenamiento de hoy.
      </s>
    </p>
  </speak>
  </voice>
  `,
  `
  <voice gender="male">
  <speak> 
    <p>
        Hola
    </p>
    <p>
        Tengo muchas ganas de hacer el entrenamiento hoy.
      
    </p> 
    <p>
        <s>
          Sin embargo
        </s>
      
      <s>
        No se olvide que necesitará conectar su nombre de usuario a nuestra sesión de hoy.
      </s>
      <s>
      Díga conecta mi cuenta e el nombre de usuario.
      </s>
    </p>
  </speak>
  </voice>
  `
  ,
  // `<speak>
  //   <p>
  //     Como debo saludar a nuestros usarios Roger?
  //   </p>
  // </speak>`,
    `<voice gender="male">
    <speak>
    <p>
      <s> 
        Hola del Entrenador de Home Fit.
      </s>
    </p>
    <p> 
      <s> 
        El único entrenador necesitará.
      </s>
      <s> 
        Para empezar, debe conectar a su cuenta a nuestra sesión actual.
      </s>
      <s> 
        Para lograrlo, diga conecta a mi cuenta y su nombre de usuario.
      </s>
    </p>
  </speak>
  </voice>
  `
  // `<speak>
  //   <p>
  //     Como debo saludar a nuestros usarios Cornelius?
  //   </p>
  // </speak>`,
  // `<speak>
  //   <p>
  //     Como debo saludar a nuestros usarios Alex?
  //   </p>
  // </speak>`
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