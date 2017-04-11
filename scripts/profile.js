// Created Tue Apr 11 2017
newScript('profile')
    .dialog((session, response) => {
        response.sendText('What should I call you?');
    })