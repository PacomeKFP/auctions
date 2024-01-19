const { ControllerWrapper } = require("../controllers/controllerWrapper");
const { UserController } = require("../controllers/userController");

class UserRouter {
  constructor() {
    this.router = require("express").Router({ mergeParams: true });

    this.controllerWrapper = new ControllerWrapper();
    this.userController = new UserController();

    this.initializeRoutes();
  }

  initializeRoutes() {
    this.router.get("/", (req, res) => res.send("Hello world from Users."));
    
    this.router.get(
      "/:userMail",
      this.controllerWrapper.run(this.userController.getUserWithMail)
    );
  }

  getRoutes = () => this.router;
}

module.exports = { UserRouter };
