const { AuctionForms } = require("../forms/AuctionsForms");
const {
  formValidationMiddleware,
} = require("../middlewares/formValidationMiddleware");
const { ControllerWrapper } = require("../controllers/controllerWrapper");
const { AuctionController } = require("../controllers/auctionController");
const { UsesCases } = require("../../../domain/usecases/UseCases");

class AuctionRouter {
  constructor() {
    this.router = require("express").Router({ mergeParams: true });
    this.forms = new AuctionForms();
    this.controllerWrapper = new ControllerWrapper();
    this.auctionController = new AuctionController(new UsesCases());
    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/", (req, res) => res.send("Hello world from Auctions."));

    // creer une nouvelle vente
    this.router.post("/", formValidationMiddleware(this.forms.createAuction));
    this.router.post(
      "/",
      this.controllerWrapper.run(this.auctionController.createAuction)
    );

    // confirmer sa presence
    this.router.post("/confirm-participation");
  }

  getRoutes = () => this.router;
}

module.exports = { AuctionRouter };
