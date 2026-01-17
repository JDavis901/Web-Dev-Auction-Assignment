const db = require("../../database");




const insertItem = (item,  done) => {

  const sql = "INSERT INTO items (name, description, starting_bid, start_date, end_date, creator_id)VALUES (?, ?, ?, ?, ?, ?)";

    let values = [item.name, item.description, item.starting_bid, item.start_date, item.end_date, item.creator_id];
        
    db.run(sql, values, function(err){
        if (err) return done(err);
        return done(null, this.lastID);
    });
};






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

module.exports = {searchItems, getItemById, insertItem};
