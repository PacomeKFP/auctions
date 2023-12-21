const { UsesCases } = require("../../../domain/usecases/UseCases");

class AuctionController {
  constructor(usesCases) {
    this.useCases = usesCases;
  }
  async createAuction(req) {
    console.clear();
    const auction = await new UsesCases().createAuction(req.body);

    return {
      data: auction,
      status: 201,
      message: "aVente crée avec success",
    };
  }

  async getAllAuctions(req) {
    return {
      data: [],
      status: 200,
      message: "liste des ventes aux encheres",
    };
  }

  async getAuctionForUser(req) {
    const userAuctionsList = await new UsesCases().getUserAuctionList(
      req.body.userMail,
      req.body.role
    );

    return {
      data: userAuctionsList,
      status: 200,
      message: "Liste des ventes aux encheres à laquelles",
    };
  }

  async confirmParticipation(req) {
    const confirm = await new UsesCases().confirmParticipation(
      req.body.auctionCode,
      req.body.userId,
      req.body.response
    );
    return {
      data: confirm ? "YES" : "NO",
      status: 200,
      message: "Participation confirmed with success",
    };
  }
}

module.exports = { AuctionController };
