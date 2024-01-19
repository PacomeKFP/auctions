const { UsesCases } = require("../../../domain/usecases/UseCases");

class UserController {
  constructor() {}

  async getUserWithMail(req) {
    const user = await new UsesCases().getUserWithMail(req.params.userMail);
    
    return {
      data: user,
      status: 200,
      message: "Les données de l'utilisateur en fonction de son adresse mail",
    };
  }
}

module.exports = { UserController };
