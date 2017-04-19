test('greeting', function(){
    return newTest()
        .expectText('Welcome to spacebot')
        .expectText('I love space!')
        .run();
});

test('profile', function(){
    return newTest()
        .expectText('Welcome to spacebot')
        .expectText('I love space!')
        .expectText('What should I call you?')
        .sendText('bot tester')
        .run();
});