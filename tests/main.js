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
        .expectButtons('Hello bot tester, what do you want to do?', [
            { type: 'postback', text: 'Photo of the day', payload: 'POTD' },
            { type: 'postbac', text: 'Space trivia', payload: 'TRIVI' },
        ])
        .run();
});