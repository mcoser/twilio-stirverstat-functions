//Use <Say> and <Record> to direct the caller to voicemail, then notify me via SMS

exports.handler = function(context, event, callback) {
  
// Instead of using a <Record> axction callback, we can use the same Function for two different webhooks
  if (event.RecordingUrl) {
    // If the webhook has a RecordingURL parameter, we know this is the <Record> action calback
    // So, we proceed accordingly by texting the URL to our cell phone
    console.log('this is the action callback');
    const twilioClient = context.getTwilioClient();
    const msg_from = event.To;
    const msg_to = context.PERSONAL_CELL;
    const msg_body = `You have a new voicemail from ${event.From} - ${event.RecordingUrl}`
    
    twilioClient.messages
      .create({ to: msg_to, from: msg_from, body: msg_body })
      .then((result) => {
        console.log('Created message using callback');
        console.log(result.sid);
        return callback();
      })
      .catch((error) => {
        console.error(error);
        return callback(error);
      });
  }
  
  else {
    // If there is no RecordingURL parameter, we can assume this was the initial TwiML fetch webhook
    // and we can simply return the <Record> verb to start the voicemail
    // Since we do not provide a <Record> action URL, Twilio will hit this same Function when the <Record> verb is complete
    console.log('This is the initial TwiML fetch...')
    let twiml = new Twilio.twiml.VoiceResponse();
    twiml.say('Thank you for calling. I am not available right now. Please leave a message after the tone. ');
    twiml.record({
    maxLength: 20,
    finishOnKey: '*'
  });

  twiml.say('I did not receive a recording. Good bye.');
  return callback(null, twiml);
  }
};
