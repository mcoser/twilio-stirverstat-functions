/**
 * <Gather> action callback
 * https://www.twilio.com/docs/voice/twiml/gather#action
 * 
 * If the digits don't match, drop the call with <Hangup>
 * Otherwise, send them through with <Dial>
 */

exports.handler = function(context, event, callback) {
  let twiml = new Twilio.twiml.VoiceResponse();
  if (event.Digits != '10') {
    twiml.hangup()
  }
  else {
    twiml.dial(context.PERSONAL_CELL)
  }
  return callback(null, twiml);
};
