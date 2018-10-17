const errorResponses = [`<speak> <p> <s> I'm sorry, I may have miss heard you. </s> <s> <prosody pitch="+5%" >Could you </prosody> <prosody pitch="+25%" > try again? </prosody></s> </p> </speak>`,
  `<speak> <p> I am terribly sorry </p> <p> I am having trouble understanding you </p> <p> <prosody pitch="+5%"> If it isn't </prosody><prosody pitch="+15%"> too much to ask </prosody> <break time="5ms" /> <prosody  pitch="+30%">could you try again? </prosody> </p> </speak>`,
  `<speak> <s> This is embarrassing for me </s> <p> I sometimes have trouble with my hearing </p> <p> even at such a young age </p> <s> Would you kindly try the command again? </s> </speak>`
];

const spanishErrorResponse = [`<speak> <p> <s> Lo siento mucho, no te puedo entender. </s> <s> <prosody pitch="+10%> ¿Podrías preguntarme otra vez? </prosody> </s> </p> </speak>`,
`<speak> <p> <s> Perdóname,`];