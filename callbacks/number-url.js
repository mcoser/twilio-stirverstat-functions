/**
 * <Number> url callback
 * https://www.twilio.com/docs/voice/twiml/number#attributes-url
 * 
 * Plays the recording to the Callee, and gives them the opportunity to hang up or be connected
 */

exports.handler = function(context, event, callback) {
  let twiml = new Twilio.twiml.VoiceResponse();
  let recoring_url = `https://api.twilio.com/2010-04-01/Accounts/${event.AccountSid}/Recordings/${event.RecordingSid}.wav`
  console.log(recoring_url)
  twiml.say('You have an incoming call from:')
  twiml.play(recoring_url)
  twiml.say('Hold to connect. Or hang up now.')
  twiml.pause( { length: 1 })
  return callback(null, twiml);
};
