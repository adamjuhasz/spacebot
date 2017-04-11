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
            .send();
    })
    .expect.text((session, response) => {
        response.sendText('Please click a button');
    })