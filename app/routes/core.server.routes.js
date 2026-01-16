const core = require('../controllers/core.server.controllers');

module.exports = (app) => {
  app.get('/search', core.search);

  app.post('/item', core.create_item);

  app.get('/item/:id', core.get_item_by_id);

  app.post('/item/:id/bids', core.add_bid);

  app.get('/item/:id/bids', core.get_bid_history);
};
