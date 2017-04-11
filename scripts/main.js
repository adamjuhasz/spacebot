// Globals
// newScript
// getScript
// addGreeting
// request

newScript()
    .dialog(function(session, response) {
        response
            .createButtons()
            .text('What do you want to do?')
            .button('postback', 'Photo of the day', 'POTD')
            .send();
    })