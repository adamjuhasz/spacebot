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
            { type: 'postback', text: 'Space trivia', payload: 'TRIVIA' },
        ])
        .run();
});

function doGreeting(test) {
    test.expectText('Welcome to spacebot')
        .expectText('I love space!')
        .expectText('What should I call you?')
        .sendText('bot tester')
        .expectButtons('Hello bot tester, what do you want to do?', [
            { type: 'postback', text: 'Photo of the day', payload: 'POTD' },
            { type: 'postback', text: 'Space trivia', payload: 'TRIVIA' },
        ]);
}

test('auto-do', function(){
    const test = newTest()
    doGreeting(test);
    return test.run();
});

test('potd regex', function(){
    const test = newTest();
    doGreeting(test);
    test.sendButtonClick('POTD')
        .expectImage(/https:/)
    return test.run();
})

test('potd mock', function(){
    const test = newTest();
    doGreeting(test);
    test.sendButtonClick('POTD')
        .expectImage('https://image.jpg')
    return rest.run();
});
