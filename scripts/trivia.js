// Created Wed Apr 12 2017

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
    .dialog((session, response) => {
        const questionNumber = Math.floor(Math.random()*questions.length);
        const current = questions[session.user.state.questionNumber];
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
    .dialog((session, response) => {
        response.createButtons()
            .text('Another question?')
            .addButton('postback', 'Yes', 'NEXT_QUESTION')
            .addButton('postback', 'No', 'MENU')
            .send();
    })