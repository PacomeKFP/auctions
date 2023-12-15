const { AuctionModel } = require("../model/auction");

class AuctionRepository {
  constructor(auctionModel) {
    this.auctionModel = AuctionModel;
  }

  async create(auction) {
    const auctionDoc = await this.auctionModel.create(auction);
    return auctionDoc;
  }

  async checkIfUserInAuction(auctionCode, userId) {
    // s'assurer que l'utilisateur fait bien partie des participants d'une vente
    const auction = await this.auctionModel.find({
      code: auctionCode,
      participants: {
        $in: [userId],
      },
    });

    return auction;
  }


  async getAuctionWithLotAndUser(lotId, userId) {
    const auction = await this.auctionModel.find({
      lots: {
        $in: [`${lotId}`],
      },
      participants: {
        $in: [`${userId}`],
      },
    });

    return auction;
  }
}

module.exports = {
  AuctionRepository,
};
