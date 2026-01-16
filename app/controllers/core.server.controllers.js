const Core = require('../models/core.server.models'); 



const search = (req, res) => res.sendStatus(500);
const create_item = (req, res) => res.sendStatus(500);
const get_item_by_id = (req, res) => res.sendStatus(500);
const add_bid = (req, res) => res.sendStatus(500);
const get_bid_history = (req, res) => res.sendStatus(500);

module.exports = {
    search,
    create_item,
    get_item_by_id,
    add_bid,
    get_bid_history
};
