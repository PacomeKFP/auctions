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
    // get all auctions with any filter
    this.router.get(
      "/",
      this.controllerWrapper.run(this.auctionController.getAllAuctions)
    );

    // get all auctions for a particular user you can provide the auction staus
    this.router.get(
      "/user/:userMail",
      this.controllerWrapper.run(this.auctionController.getAuctionForUser)
    );

    // creer une nouvelle vente
    this.router.post(
      "/",
      [
        (req, res, next) => {
          console.log(req.body);
          next();
        },

        formValidationMiddleware(this.forms.createAuction),
      ],
      this.controllerWrapper.run(this.auctionController.createAuction)
    );

    // confirmer sa presence
    this.router.post(
      "/confirm-participation",
      [formValidationMiddleware(this.forms.confirmParticipation)],
      this.controllerWrapper.run(this.auctionController.confirmParticipation)
    );

    //TODO: Obtenir les informations sur une vente
    this.router.get(
      "/:auctionCode",
      [],
      this.controllerWrapper.run(this.auctionController.getAuctionWithCode)
    );
    this.router.get(
      "/retro/:auctionCode",
      [],
      this.controllerWrapper.run(this.auctionController.getAuctionRetro)
    );
  }

  getRoutes = () => this.router;
}

module.exports = { AuctionRouter };
