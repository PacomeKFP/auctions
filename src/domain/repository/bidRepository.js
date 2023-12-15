const { BidModel } = require("../model/bid");

class BidRepository {
  constructor(bidModel) {
    // here
    this.bidModel = BidModel;
  }

  async addBid(lotId, userId, amount) {
    // check if amount is correct

    this.bidModel.create({
      lot: lotId,
      user: userId,
      amount,
    });
  }

  async getBestProposition(lotId) {
    const bestProposition = this.bidModel
      .find({ lot: lotId })
      .sort({ amount: 1 })
      .limit(1);
    if (!bestProposition) return false;

    return bestProposition.amount;
  }
}
module.exports = { BidRepository };
