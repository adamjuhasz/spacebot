test('greeting', function(){
    return newTest()
        .expectText('Welcome to spacebot')
        .expectText('I love space!')
        .run();
});
