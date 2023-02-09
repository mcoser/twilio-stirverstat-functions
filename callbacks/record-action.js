/**
 * <Record> action callback
 * https://www.twilio.com/docs/voice/twiml/record#attributes-action
 * 
 * Will just <Play> a file, and wait for the call to be updated (see callbacks/record-status.js)
 */

exports.handler = function(context, event, callback) {
  let twiml = new Twilio.twiml.VoiceResponse();
  twiml.play('http://com.twilio.music.electronica.s3.amazonaws.com/teru_-_110_Downtempo_Electronic_4.mp3')
  return callback(null, twiml);
};
