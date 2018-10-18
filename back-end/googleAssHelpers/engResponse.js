const errorResponses = [`<speak> <p> <s> <prosody rate="slow" volume="-2db"> I'm sorry, </prosody> <break time="5ms"/> I may have miss heard you. </s> <s> <prosody pitch="+5%" >Could you </prosody> <prosody pitch="+25%" > try again? </prosody></s> </p> </speak>`,
  `<speak> <prosody rate="fast" volume="-1db" > <p> I am terribly sorry </p> <break time="5ms" /> <p> I am having trouble understanding you </p> <p> <prosody pitch="+5%"> If it isn't </prosody><prosody pitch="+15%"> too much to ask </prosody> <break time="5ms" /> <prosody  pitch="+30%">could you try again? </prosody> </p> </prosody> </speak>`,
  `<speak> <s> This is embarrassing for me </s> <p> I sometimes have trouble with my hearing </p> <p> even at such a young age </p> <s> Would you kindly try the command again? </s> </speak>`
];


const linkAccountObjResponses = [
  {
    before: '<speak> <s> <prosody pitch="+10%" rate="fast"> Thank </prosody> <prosody pitch="-3%" rate="fast"> you </prosody> <prosody rate="fast"></s> <s> ',
    after: '</s> <s> for linking your account to your current session. </s> <s> Lets get started </s> </prosody></speak>'
  },
  {
    before: '<speak><prosody rate="fast"> <s> <prosody pitch="+10%"> We apologize </prosody> for the <prosody pitch="-10%"> inconvenience </prosody> </s> <p> <s>',
    after: '</s> </p> <break time ="50ms"/> <s> We have now linked your account to your current session with us. </s> <s> Lets get you moving </s> </prosody> </speak>'
  },
  {
    before: '<speak> <s> <prosody pitch="-5%" rate="slow"> Well </prosody> </s> <p> <s>',
    after: '</s> </p> <break time="5ms" /> <prosody rate="fast"><s> Looks like we are all set </s> <s> lets get started with those exercises </s> </prosody> </speak>'
  },
  {
    before: '<speak> <prosody rate="fast"> <s> <prosody pitch="+20%">>Glad to have you back ',
    after: ' </prosody> </s> <s> Now that we got all the technical stuff out of the way </s> <s> Lets get ready to start that workout </s> </prosody> </speak>'
  }
];

const startWorkoutObjResponses = [
  {
    before: '<speak> <prosody rate="fast" volume="loud" pitch="+30%"> <s> Let me know when you are ready to begin your ',
    after: ' and are in position. </s> </prosody> </speak>'
  },
  {
    before: '<speak> <prosody rate="fast" volume="loud" pitch="+30%"> <s> Lets do some',
    after: '</s> <s> Let me know when you are ready</s> </prosody> </speak>'
  },
  {
    before: '<speak> <prosody rate="fast" volume="loud" pitch="+30%"> <s> <prosody pitch="+20%" ><emphasis level="reduced"> cowabunga  </emphasis></prosody> </s><s>lets do some',
    after: '</s> <break time="500ms" /> <prosody pitch="30%" volume="loud"> Come on <break time="5ms" /> Are you ready? </prosody> </prosody> </speak>'
  },
  {
    before: '<speak> <prosody rate="fast" volume="loud" pitch="+30%"> <s> Alright it is ',
    after: ' time </s> <s> Let\'s get going! </s> <s> You ready? </s> </prosody>  </speak>'
  }
];

const nextExerObjResponses = [
  {
    part1: {
      before: '<speak> <s> The recommended pace for ',
      prep: 'is',
      after: ' seconds. </s> <s> Let\'s begin </s> <break time="500ms" />'
    },
    part2: {
      before: ' <s> Let\ss take a break.</s> <s> Let me know when you are ready to do another set </s> <s> Or if you want to start ',
      after: ', we can do that as well</s> </speak>'
    }
  }
];

const greetings = [
  `<speak>
    <prosody rate="fast">
    <p>
      <s>
        <prosody volume="+3db" pitch="+25%" >
          Welcome to Home fit trainer
        </prosody>
      </s>
      <s>
        <prosody volume="+3db" pitch="+30%" >
          The <break time="10ms" /> fitness trainer <break time="5ms" /> 
        </prosody> 
        <prosody rate="slow" volume="+1db" pitch="+15%" > 
          designed for your personal needs.
        </prosody>
      </s> 
    </p>
    <p>
      <s>
        Before we begin
      </s>
      <s>
        I will need you to connect our session to your home fit account
      </s>
      <s>
        To do that all you have to do is say link my account and say your account name
      </s>
      <s>
        after you link up we can begin today's workout
      </s>
    </p>
    </prosody>
  </speak>`,

  `<speak> 
  <prosody rate="fast">
    
    <p>
      <prosody volume="+2db" pitch="+10%">
        I am excited for our workout today
      </prosody>
    </p> 
    <p>
      <prosody rate="slow" volume="-1db" pitch="-5%">
        <s>
          But
        </s>
      </prosody>
      <prosody rate="fast" volume="+1db+ pitch="+5%">
      <s>
        Don't forget you will need to connect our current session with your home fit username
      </s>
      <s>
        all you have to do is say link my account and say your account name 
      </s>
      </prosody>
    </p>
    </prosody>
  </speak>`,

  // `<speak>
  // <prosody rate="fast">
  //   <p>
  //     How should i greet our users roger?
  //   </p>
  //   </prosody>
  // </speak>`,

  // `<speak>
  // <prosody rate="fast">
  //   <p>
  //     How should i greet our users josh?
  //   </p>
  //   </prosody>
  // </speak>`,

  // `<speak>
  // <prosody rate="fast">
  //   <p>
  //     How should i greet our users cornelius?
  //   </p>
  //   </prosody>
  // </speak>`
];

module.exports = {
  greetings,
  nextExerObjResponses,
  startWorkoutObjResponses,
  linkAccountObjResponses,
  errorResponses
}