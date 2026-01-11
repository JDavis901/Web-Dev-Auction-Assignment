const db = require('../../database');

const insertQuestion = (question, user_id, item_id, done) => {
    db.run(
        `INSERT INTO questions (question, asked_by, item_id)
         VALUES (?, ?, ?)`,
        [question, user_id, item_id],
        function(err){
            if (err) return done(err);
            return done(null, this.lastID);
        }
    );
};

const getQuestionsForItem = (item_id, done) => {
    db.all(
        `SELECT * FROM questions WHERE item_id = ?`,
        [item_id],
        (err, rows) => {
            if (err) return done(err);
            return done(null, rows);
        }
    );
};

module.exports = { insertQuestion, getQuestionsForItem };
