const { AuctionModel } = require("../src/domain/model/auction");
const { LotModel } = require("../src/domain/model/lot");
const {
  AuctionRepository,
} = require("../src/domain/repository/auctionRepository");
const { LotRepository } = require("../src/domain/repository/lotRepository");

class LotUseCases {
  constructor(lotRepository) {
    this.lotRepository = new LotRepository(LotModel);
    this.auctionRepository = new AuctionRepository(AuctionModel);
  }
  async createLot(lotDoc) {
    const lot = this.lotRepository.create(lotDoc);
    if (!lot) console.log("Erro Occured When Creating lot");
    return lot;
  }

  async checkIfUserHaveAccess(lotId, userId) {
    const auction = await this.auctionRepository.getAuctionWithLotAndUser(
      lotId,
      userId
    );

    if (!auction) {
      console.log("there is no auction -- checkIf User have Acces");
      return false;
    }

    return true;
  }
}
module.exports = { LotUseCases };
