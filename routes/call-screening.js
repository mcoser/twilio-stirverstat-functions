// Use <Say> and <Record> to screen the call before accepting

exports.handler = function(context, event, callback) {
	let twiml = new Twilio.twiml.VoiceResponse();
  twiml.say('Before being connected, please briefly state your name, and reason for calling. Press the star key when finished.');
  twiml.record({
    // the <Record> action is hit as soon as the <Record> verb ends
    action: '/callbacks/record-action',
    // the recordingStatusCallback is hit when the recording is ready
    recordingStatusCallback: '/callbacks/record-status',
    maxLength: 20,
    finishOnKey: '*'
  });

  twiml.say('I did not receive a recording. Good bye.');
  
  return callback(null, twiml);
};
