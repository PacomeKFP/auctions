const { AppBaseError } = require("../../errors/base");
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

  async openLot(lotId) {
    const lot = await this.lotModel.findById(lotId);
    if (!lot)
      throw new AppBaseError(
        AppBaseError.EErrorCodes.RESOURCE_NOT_FOUND_ERROR,
        "Le lot que vous voulez ouvrir n'existe pas",
        404
      );
    lot.status = "ON_SALE";
    await lot.save();
    return lot;
  }

  async closeLot(lotId) {
    const lot = await this.lotModel.findById(lotId);
    if (!lot)
      throw new AppBaseError(
        AppBaseError.EErrorCodes.RESOURCE_NOT_FOUND_ERROR,
        "Le lot que vous voulez ouvrir n'existe pas",
        404
      );
    lot.status = "CLOSED";
    await lot.save();
    return lot;
  }

  async getBounty(lotId) {
    const lot = await this.lotModel.findById(lotId);
    if (!lot) return false;

    return lot.bounty;
  }
}

module.exports = { LotRepository };
