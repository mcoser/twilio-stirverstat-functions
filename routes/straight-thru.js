//Uses a <Dial> to send the caller right through to my cell phone

exports.handler = function(context, event, callback) {
	let twiml = new Twilio.twiml.VoiceResponse();
  twiml.dial(context.PERSONAL_CELL);
  return callback(null, twiml);
};
