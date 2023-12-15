const { LotModel } = require("../model/lot");

class LotRepository {
  constructor(lotModel) {
    // here
    this.lotModel = LotModel;
  }
  async create(lotDoc) {
    console.log(lotDoc);
    const lot = await this.lotModel.create(lotDoc);
    if (!lot) console.log("Error occured when creating Lot");
    // TODO:  errors Handlings

    return lot;
  }

  async getBounty(lotId) {
    const lot = await this.lotModel.findById(lotId);
    if (!lot) return false;

    return lot.bounty;
  }
}

module.exports = { LotRepository };
