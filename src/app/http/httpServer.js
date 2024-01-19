const express = require("express");
const cors = require("cors");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");

const { AuctionRouter } = require("./routers/auctionRouter");
const { BidRouter } = require("./routers/bidRouter");
const { LotRouter } = require("./routers/lotRouter");
const { UserRouter } = require("./routers/userRouter");

class HttpServer {
  constructor(routePrefix, port) {
    this.routePrefix = routePrefix || "";
    this.port = port | 3000;

    this.app = express();

    this.configureMiddleware();
    this.setupRoutes();
  }

  configureMiddleware() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());

    this.app.use(mongoSanitize());
    this.app.use(xss());

    this.app.use(cors());
  }

  setupRoutes() {
    this.app.get(`${this.routePrefix}`, (req, res) => res.send("Hello World"));

    this.app.use(
      `${this.routePrefix}/auctions`,
      new AuctionRouter().getRoutes()
    );
    this.app.use(`${this.routePrefix}/bids`, new BidRouter().getRoutes());
    this.app.use(`${this.routePrefix}/lots`, new LotRouter().getRoutes());
    this.app.use(`${this.routePrefix}/users`, new UserRouter().getRoutes());
  }

  launchServer() {
    this.app.listen(this.port, () => {
      console.log(`Server listening on port ${this.port}`);
    });
  }
}

module.exports = { HttpServer };
