const Questions = require('../models/question.server.models'); 


const ask_question = (req, res) => res.sendStatus(500);
const get_questions = (req, res) => res.sendStatus(500);
const answer_question = (req, res) => res.sendStatus(500);

module.exports = {
    ask_question,
    get_questions,
    answer_question
};
