const { ControllerWrapper } = require("../controllers/controllerWrapper");
const { LotController } = require("../controllers/lotController");

class LotRouter {
  constructor() {
    this.router = require("express").Router({ mergeParams: true });
    this.lotController = new LotController();
    this.controllerWrapper = new ControllerWrapper();
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/", (req, res) => res.send("Hello world from Lots."));

    // Obtenir le lot courant pour une vente
    this.router.get(
      "/current/:auctionCode",
      [],
      this.controllerWrapper.run(this.lotController.getCurrentLotForAuction)
    );
  }

  getRoutes = () => this.router;
}

module.exports = { LotRouter };
