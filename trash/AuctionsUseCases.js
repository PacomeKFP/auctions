const {
  GoogleMailService,
} = require("../src/infrastructure/Services/Mail/GmailSevice");
const { AuctionRepository } = require("../src/domain/repository/auctionRepository");
const { LotRepository } = require("../src/domain/repository/lotRepository");
const { UserRepository } = require("../src/domain/repository/userRepository");
const { LotUseCases } = require("./LotsUseCases");
const uuidv4 = require("uuid").v4;

class AuctionUseCase {
  constructor(auctionRepository, serverHostForLinks) {
    this.auctionRepository = new AuctionRepository();
    this.mailService = new GoogleMailService();

    const { SERVER_HOST_FOR_LINKS } = process.env;
    this.serverHostForLinks = SERVER_HOST_FOR_LINKS; //
  }

  async createAuction(auction) {
    let auctionDoc = auction;

    // creer le code de la vente
    auctionDoc["code"] = uuidv4();

    // rediger le contenu du mail
    const mailContent = `Vous etes invité à la vente ${auctionDoc.code}`;

    // envoyer les invitations aux participants
    for (const participant in auctionDoc.participants)
      await this.mailService.sendMail(participant, mailContent);

    // creer les differents lots
    let lots = [];
    const lotUseCases = new LotUseCases();
    for (const lot in auctionDoc.lots) {
      const lotDoc = lotUseCases.createLot(lot);
      lots.push(lotDoc._id);
    }
    auctionDoc.lots = lots;

    // creer le lot proprement dit
    this.auctionRepository.create(auctionDoc);
  }

  async confirmParticipation(auctionCode, userId) {
    // verifier si la personne participe a la vente
    const auction = this.auctionRepository.checkIfUserInAuction(auctionCode, userId);
    if (!auction)
      // l'utilisateur n'a pas le droit
      return false;

    const userRepo = new UserRepository();
    userRepo.confirmParticipation(auctionCode, userId);
  }

  createAuctionLink = (auctionCode) =>
    `${this.serverHostForLinks}/${auctionCode}`;
}
