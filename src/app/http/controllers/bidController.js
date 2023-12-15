const { UsesCases } = require("../../../domain/usecases/UseCases");

class BidController {
  constructor() {
    this.usesCases = new UsesCases();
  }

  async placeBid(req) {
    const bid = await this.usesCases.placeBid(...req.body);

    return {
      data: bid,
      status: 201,
      message: "Bid placed with sucess",
    };
  }
}

module.exports = { BidController };
