// Human Detection - make the caller solve a voice captcha, which is hard for computers but easy for people

exports.handler = function(context, event, callback) {
  let twiml = new Twilio.twiml.VoiceResponse();
  const gather = twiml.gather({
    action: '/callbacks/gather-action',
    numDigits: 2
  });
  gather.say('To prove you are human, please enter the number after nine.');
  twiml.say('We didn\'t receive any d t m f input. Goodbye!');

  return callback(null, twiml);

};
