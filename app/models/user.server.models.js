const db = require('../../database');

const insertUser = (first, last, email, password, salt, done) => {
    const sql = `
        INSERT INTO users (first_name, last_name, email, password, salt)
        VALUES (?, ?, ?, ?, ?)
    `;
    db.run(sql, [first, last, email, password, salt], function(err){
        if (err) return done(err);
        return done(null, this.lastID);
    });
};

const getUserByEmail = (email, done) => {
    db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
        if (err) return done(err);
        return done(null, row);
    });
};

module.exports = { insertUser, getUserByEmail };
