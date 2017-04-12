// Created Tue Apr 11 2017
newScript('profile')
    .dialog('nickname', (session, response) => {
        return Promise.delay(500)
            .then(() => response.sendText('What should I call you?'));
    })
    .expect
        .text((session, response) => {
            session.user.state.name = session.message.text;
        })
        .catch((session, response) => {
            response.goto('nickname');
        })