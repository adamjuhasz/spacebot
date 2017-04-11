// Globals
// newScript
// getScript
// addGreeting
// request

newScript()
    .dialog(function(session, response) {
        response
            .createButtons()
            .text('Pick an option')
            .button('postback', 'Photo of the day', 'POTD')
            .send();
    })