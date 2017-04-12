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
        session.user.state.questionNumber = questionNumber;
        const current = questions[questionNumber];
        const buttons = response.createButtons()
            .text(current.question)
            .addButton('postback', current.correct, current.correct);
        current.wrong.forEach(answer => buttons.addButton('postback', answer, answer));
        buttons.send();
    })