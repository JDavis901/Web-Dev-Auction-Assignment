const core = require("../controllers/core.server.controllers");
const auth = require("../lib/authentication");

module.exports = (app) => {
  app.get("/search", core.search);

  app.post("/item", auth.authenticate, core.createItem);

  app.get("/item/:item_id", core.get_item_by_id);

  app.post("/item/:item_id/bid", auth.authenticate, core.add_bid);

  app.get("/item/:item_id/bid", core.get_bid_history);
};
