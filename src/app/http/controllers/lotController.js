const { UsesCases } = require("../../../domain/usecases/UseCases");

class LotController {
  constructor() {
    this.usesCases = new UsesCases();
  }

  async getCurrentLotForAuction(req) {
    const lot = await new UsesCases().getCurrentLotForAuction(
      req.params.auctionCode
    );

    return {
      data: lot,
      status: 200,
      message: "The current Lot for the given auction code",
    };
  }
}

module.exports = { LotController };
