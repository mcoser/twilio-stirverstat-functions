/**
 * <Dial><Number> TwiML
 * https://www.twilio.com/docs/voice/twiml/dial
 * https://www.twilio.com/docs/voice/twiml/number#attributes-url
 * 
 * Used to set the recording as the screening url, 
 * which the callee will hear before the caller is bridged.
 */

exports.handler = function(context, event, callback) {

  let twiml = new Twilio.twiml.VoiceResponse();
  let number_url = `/callbacks/number-url?AccountSid=${event.AccountSid}&RecordingSid=${event.RecordingSid}`
  
  const dial = twiml.dial();
  dial.number({
    url: number_url
  }, 
  context.PERSONAL_CELL);
  return callback(null, twiml);
};
