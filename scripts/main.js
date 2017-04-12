// Globals
// newScript
// getScript
// addGreeting
// request

newScript()
    .dialog(function(session, response) {
        response
            .createButtons()
            .text(`Hi ${session.user.state.name}, what do you want to do?`)
            .addButton('postback', 'Photo of the day', 'POTD')
            .addButton('postback', 'Space trivia', 'TRIVIA')
            .send();
    })
    .expect
        .text((session, response) => {
            response.sendText('Please click a button');
        })
        .button('POTD', (session, response) => {
            response.startScript('POTD');
        })
        .button('TRIVIA', (session, response) => {
            response.startScript('TRIVIA');
        })