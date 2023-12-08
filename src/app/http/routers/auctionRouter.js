class AuctionRouter {
  constructor() {
    this.router = require("express").Router({ mergeParams: true });
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/", (req, res) => res.send("Hello world from Auctions."));
  }

  getRoutes = () => this.router;
}

module.exports = { AuctionRouter };
