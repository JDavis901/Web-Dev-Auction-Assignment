const questions = require('../controllers/question.server.controllers');

module.exports = function(app){
    app.route('/items/:id/questions')
        .post(questions.ask_question)
        .get(questions.get_questions);

    app.route('/questions/:id/answer')
        .post(questions.answer_question);
};
