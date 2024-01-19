const { UsesCases } = require("../../../domain/usecases/UseCases");

class AuctionController {
  constructor(usesCases) {
    this.useCases = usesCases;
  }

  async getAuctionWithCode(req) {
    const auction = await new UsesCases().getAuctionWithCode(
      req.params.auctionCode
    );

    return {
      data: auction,
      status: 200,
      message: "Les données sur l'enchere",
    };
  }
  async createAuction(req) {
    const auction = await new UsesCases().createAuction(req.body);

    return {
      data: auction,
      status: 201,
      message: "aVente crée avec success",
    };
  }

  async getAllAuctions(req) {
    console.log("Getting auctions");
    return {
      data: [
        {
          code: "12345",
          name: "test",
          description: "test",
        },
      ],
      status: 200,
      message: "liste des ventes aux encheres",
    };
  }

  async getAuctionForUser(req) {
    const userAuctionsList = await new UsesCases().getUserAuctionList(
      req.query.userMail,
      req.query.role
    );

    return {
      data: userAuctionsList,
      status: 200,
      message: "Liste des ventes aux encheres pour l'utilisateur",
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

  async getAuctionRetro(req) {
    const auctionRetro = await new UsesCases().getAuctionRetro(
      req.params.auctionCode
    );

    return {
      data: auctionRetro,
      status: 200,
      message: "La retrospective de la vente au encheres",
    };
  }
}

module.exports = { AuctionController };
