const { BidRepository } = require("../src/domain/repository/bidRepository");

class BidUseCases {
  constructor() {
    this.bidRepository = new BidRepository();
  }

  placeBid(lotId, userId, amount) {
    // verifier si l'utilisateur a le droit d'acceder à la vente
    this.bidRepository.addbid(lotId, userId, amount);
  }
}
