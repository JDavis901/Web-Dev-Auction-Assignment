const core = require('../controllers/core.server.controllers');

module.exports = (app) => {
  // These are example routes — match whatever the assignment expects
  app.get('/items', core.search);
  app.post('/items', core.create_item);
  app.get('/items/:id', core.get_item_by_id);
  app.post('/items/:id/bids', core.add_bid);
  app.get('/items/:id/bids', core.get_bid_history);
};
