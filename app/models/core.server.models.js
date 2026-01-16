const db = require("../../database");

const searchItems = (done) => {
    db.all(`SELECT * FROM items`, [], (err, rows) => {
        if (err) return done(err);
        return done(null, rows);
    });
};

const getItemById = (id, done) => {
    db.get("SELECT * FROM items WHERE item_id = ?", [id], (err, row) => {
        if (err) return done(err);
        return done(null, row);
    });
};

module.exports = { searchItems, getItemById };
