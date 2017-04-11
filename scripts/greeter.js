// Created Tue Apr 11 2017
addGreeting(function(user, response){
    console.log('greeting run');
    response
        .sendText('Welcome to spacebot')
        .sendText('I love space!');
});
