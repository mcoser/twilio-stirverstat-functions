exports.handler = function(context, event, callback) {
 
	let twiml = new Twilio.twiml.VoiceResponse();
	let verstat = event.StirVerstat;

	switch (verstat) {
            
    case 'TN-Validation-Passed-A':
      // Full Attestation (A): 
      //  The Identity of the caller is known, and they have the right to use the callerId for this call.
      // Let's send these calls straight through to our main number
      twiml.redirect("/routes/straight-thru")
      break;
            
    case 'TN-Validation-Passed-B':
      // Partial Attestation (B):
      //  The Identity of the caller is known, but Twilio does not know if they have the right to use the callerId.
      //
      // screen - trusted source, but the number isn't known. let's find out who it is before accepting.
      twiml.redirect("/routes/call-screening")
      break;
            
    case 'TN-Validation-Passed-C':
      // Gateway Attestation (C): 
      //  Call is coming internationally, or from a verified gateway via a thrid party service provider
      //
      // These calls should go straight to voicemail
      // if its important, they will leave a msg, but this is not worth picking up immediatley. 
      twiml.redirect("/routes/vm")
      break;
            
    case undefined:
      // If the StirVerstat param is undefined, let's use Human Detection
      // In reality, there are a few cases where this could happen. Let's at least make sure its not a robot.
      twiml.redirect("/routes/human-detection");
      break;

    // Now, we want to <Reject> any call with a callerId that cannot be validated. 
    // You may want do different things for each of these cases, 
    // or log them to investigate further    
    case caseContains('Validation-Failed'): 
    // 'failed' can have different levels, but here we just want to reject all of them
    case 'No-TN-Validation':
    // Fore more info on all the Attestation levels, 
    // see the docs at https://www.twilio.com/docs/voice/trusted-calling-with-shakenstir
    default:
      twiml.reject();
      break;     
  }

  // helper function to use .includes() with a switch case
  function caseContains(term) {
    if (verstat.includes(term)) {
      return verstat;
    } 
  }

  return callback(null, twiml); 
};
