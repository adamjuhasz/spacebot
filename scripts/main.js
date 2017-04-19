addGreeting(function(user, response){
    console.log('greeting run');
    response
        .sendText('Welcome to spacebot')
        .sendText('I love space!');
    response.startScript('profile');
});

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

newScript()
    .dialog('start', function(session, response) {
        response
            .createButtons()
            .text(`Hello ${session.user.state.name}, what do you want to do?`)
            .addButton('postback', 'Photo of the day', 'POTD')
            .addButton('postback', 'Space trivia', 'TRIVIA')
            .send();
    })
    .expect
        .text((session, response) => {
            response.sendText('Please click a button');
            response.goto('start');
        })
        .button('POTD', (session, response) => {
            response.startScript('POTD');
        })
        .button('TRIVIA', (session, response) => {
            response.startScript('TRIVIA');
        })
        
newScript('POTD')
    .dialog((session, response) => {
        return request({
            uri: 'https://api.nasa.gov/planetary/apod',
            method: 'GET',
            qs: {
                api_key: 'DEMO_KEY'
            },
            json: true,
        })
        .then(apod => {
            response.sendImage(apod.url);
        })
        .delay(3000)
    })


const questions = [{
    question: 'What type of galaxy is the most common in the universe?',
    correct: 'Elliptical',
    wrong: ['Spiral','Irregular']
},
{
    question: 'What is the coldest place in the universe?',
    correct: 'Boomerang Nebula',
    wrong: ['Center of the Milky Way','Moon\'s surface', 'Pluto\'s surface'],    
},
{
    question: 'How old is the universe in light years?',
    correct: '13.8',
    wrong: ['1.4', '60', '76'],    
}]

newScript('TRIVIA')
    .dialog('start', (session, response) => {
        const questionNumber = Math.floor(Math.random()*questions.length);
        console.log(questionNumber);
        const current = questions[questionNumber];
        console.log(current);
        session.user.state.trivia = current;
        const buttons = response.createButtons()
            .text(current.question)
            .addButton('postback', current.correct, current.correct);
        current.wrong.forEach(answer => buttons.addButton('postback', answer, answer));
        buttons.send();
    })
    .expect
    .button((session, response) => {
        const current = session.user.state.trivia;
        if (session.message.payload === current.correct) {
            response.sendText('YES!');
        } else {
            response.sendText('NO :(');
        }
    })
    .dialog('menu', (session, response) => {
        response.createButtons()
            .text('Another question?')
            .addButton('postback', 'Yes', 'NEXT_QUESTION')
            .addButton('postback', 'No', 'MENU')
            .send();
    })
    .expect
        .button('NEXT_QUESTION', (session, response) => {
            response.goto('start');
        })
        .button('MENU', (session, response) => {
        })
        .intent('general', 'yes', (session, response) => {
            response.goto('start');
        })
        .intent('general', 'no', (session, response) => {
        })
        .catch((session, response) => {
            response.sendText('huh?');
            response.goto('menu');
        })

