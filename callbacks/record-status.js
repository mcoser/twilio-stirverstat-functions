/**
 * <Record> status callback
 * https://www.twilio.com/docs/voice/twiml/record#attributes-recording-status-callback
 * 
 * When hit, updates the current call with a <Dial><Number>
 */

exports.handler = function(context, event, callback) {
  if (event.RecordingStatus == 'completed') {
      const twilioClient = context.getTwilioClient();
      // we want to update the call with a <Dial><Number> and use the RecordingURL as the screening url
      const updateUrl = `${FUNCTION_BASE_URL}/callbacks/dial-number?RecordingSid=${event.RecordingSid}&AccountSid=${event.AccountSid}`
    
    twilioClient.calls(event.CallSid)
      .update({ url: updateUrl})
        .then((result) => {
          console.log('Updated call using recording info');
          console.log(result.status);
          return callback();
        })
        .catch((error) => {
          console.error('The TwiML update failed')
          console.error(error);
          return callback(error);
        });
    }
  else {
    console.log(`Recording Status: ${event.RecordingStatus}`)
    return callback()
  }
};
