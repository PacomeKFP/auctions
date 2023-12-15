const express = require("express");
const cors = require("cors");
const { AuctionRouter } = require("./routers/auctionRouter");
const { BidRouter } = require("./routers/bidRouter");
const { LotRouter } = require("./routers/lotRouter");
class HttpServer {
  constructor(routePrefix, port) {
    this.routePrefix = routePrefix || "/";
    this.port = port | 3000;

    this.app = express();

    this.configureMiddleware();
    this.setupRoutes();
  }

  configureMiddleware() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(cors());

  }

  setupRoutes() {
    console.log(this.routePrefix + "route pre");
    this.app.get(`${this.routePrefix}`, (req, res) => res.send("Hello World"));

    this.app.use(
      `${this.routePrefix}/auctions`,
      new AuctionRouter().getRoutes()
    );
    this.app.use(`${this.routePrefix}/bids`, new BidRouter().getRoutes());
    this.app.use(`${this.routePrefix}/lots`, new LotRouter().getRoutes());
  }

  launchServer() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}

module.exports = { HttpServer };
