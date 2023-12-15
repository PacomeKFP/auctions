const { UsesCases } = require("../../../domain/usecases/UseCases");

class AuctionController {
  constructor(usesCases) {
    this.usesCases = new UsesCases();
  }
  async createAuction(req) {
    console.clear();
    const auction = await (new UsesCases())
      .createAuction(req.body)
      .then((re) => console.log("yo"));

    return {
      data: auction,
      status: 201,
      message: "auction created with success",
    };
  }

  async confirmParticipation(req) {
    const confirm = await this.useCases.confirmParticipation(auction, userId);

    return {
      data: confirm,
      status: 200,
      message: "Participation confirmed with success",
    };
  }
}

module.exports = { AuctionController };
