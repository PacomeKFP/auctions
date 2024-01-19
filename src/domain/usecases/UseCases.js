const { AppBaseError } = require("../../errors/base");
const {
  GoogleMailService,
} = require("../../infrastructure/Services/GmailSevice");
const { MathUtils } = require("../../utils/maths");
const { AuctionRepository } = require("../repository/auctionRepository");
const { BidRepository } = require("../repository/bidRepository");
const { LotRepository } = require("../repository/lotRepository");
const { UserRepository } = require("../repository/userRepository");
const uuidv4 = require("uuid").v4;

class UsesCases {
  constructor() {
    this.auctionRepository = new AuctionRepository();
    this.bidRepository = new BidRepository();
    this.lotRepository = new LotRepository();
    this.userRepository = new UserRepository();
    this.mailServices = new GoogleMailService();
  }

  async getAuctionRetro(auctionCode) {
    const auctionRetro = await this.getAuctionWithCode(auctionCode);

    auctionRetro.lots = auctionRetro.lots.map(async (lot) => {
      lot.bids = await this.bidRepository.getAllBidsForLot(lot._id);
      return lot;
    });

    return auctionRetro;
  }

  async getAuctionWithCode(auctionCode) {
    const auction = await this.auctionRepository.getAuctionWithCode(
      auctionCode
    );

    console.log(auction);
    if (!auction)
      throw new AppBaseError(
        AppBaseError.EErrorCodes.RESOURCE_NOT_FOUND_ERROR,
        "Cette vente n'existe pas",
        404
      );

    return auction;
  }

  async getUserWithMail(userMail) {
    const user = this.userRepository.getUserWithMail(userMail);

    return user;
  }

  async getUserAuctionList(userMail, role, allowedAuctionStatus) {
    // role in  [participant : admin, all]

    let userAuctions = [];
    if (role === "admin" || role === "all")
      userAuctions = await this.auctionRepository.getAuctionForAdmin(
        userMail,
        allowedAuctionStatus
      );
    if (role === "participant" || role === "all") {
      let auctions = await this.userRepository.getAllAuctionsAsParicipant(
        userMail
      );
      for (const _auction of auctions) {
        const auction = await this.auctionRepository.getAuctionWithCode(
          _auction.auction,
          allowedAuctionStatus
        );
        userAuctions.push(auction);
      }
    }

    return userAuctions;
  }

  async createAuction(auction) {
    let auctionDoc = auction;

    // creer le code de la vente
    auctionDoc["code"] = uuidv4();

    // TODO: generer le lien de la vente

    // rediger le contenu du mail
    const mailContent = `Vous etes invité à la vente ${auctionDoc.code}`;

    // save the admin
    // envoyer les invitations aux participants
    for (const participant in auctionDoc.participants)
      await this.mailServices.sendMail(participant, mailContent);

    // enregistrer tous les participants
    const users = await this.registerUsers(
      auctionDoc.participants,
      auctionDoc.anonymous === true,
      auctionDoc.code
    );
    auctionDoc.participants = users;

    // creer les differents lots
    let lots = [];
    for (const lot of auctionDoc.lots) {
      console.log(lot);
      const lotDoc = await this.createLot(lot);
      lots.push(lotDoc._id);
    }
    auctionDoc.lots = lots;

    // creer le lot proprement dit
    return await this.auctionRepository.create(auctionDoc);
  }

  createAuctionLink = (auctionCode) =>
    `${this.serverHostForLinks}/${auctionCode}`;

  async createLot(lotDoc) {
    const lot = this.lotRepository.create(lotDoc);
    if (!lot) console.log("Erro Occured When Creating lot");
    return lot;
  }

  async registerUsers(emails, anonymous, auctionCode) {
    const numberLen = (x) => Math.ceil(Math.log10(x));
    const mails = new MathUtils().shuffle(emails);
    const expectedLen = numberLen(mails.length) + 1;
    const users = [];
    for (const mail of mails) {
      console.log(String(mails.indexOf(mail)).padStart(expectedLen, "0"), mail);
      const user = await this.userRepository.createUser(
        mail,
        anonymous,
        auctionCode,
        String(mails.indexOf(mail)).padStart(expectedLen, "0")
      );

      users.push(user._id);
    }

    return users;
  }

  async confirmParticipation(auctionCode, userId, response) {
    // verifier si la personne participe a la vente
    const auction = await this.auctionRepository.checkIfUserInAuction(
      auctionCode,
      userId
    );

    // l'utilisateur n'a pas le droit
    if (!auction) return false;
    return await this.userRepository.confirmParticipation(
      auctionCode,
      userId,
      response
    );
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

  async placeBid(lotId, userId, amount) {
    // verifier si l'utilisateur a le droit d'acceder à la vente
    const haveAccess = await this.checkIfUserHaveAccess(lot, userId);
    if (!haveAccess) return false;

    // regarder le minimum requis pour une proposition
    const minProposition =
      this.bidRepository.getBestProposition(lotId) |
      this.lotRepository.getBounty(lotId);

    if (amount < minProposition) return false;

    const bid = await this.bidRepository.addBid(lotId, userId, amount);
    return bid;
  }
}

module.exports = { UsesCases };
