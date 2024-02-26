const { AppBaseError } = require("../../errors/base");
const {
  GoogleMailService,
} = require("../../infrastructure/Services/Mail/GmailSevice");
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

  async closeAuction(auctionCode) {
    const auction = await this.auctionRepository.closeAuction(auctionCode);
    return auction;
  }

  async openLot(lotId) {
    const lot = await this.lotRepository.openLot(lotId);
    return lot;
  }

  async closeLot(lotId) {
    const lot = await this.lotRepository.closeLot(lotId);
    return lot;
  }

  async getCurrentLotForAuction(auctionCode) {
    const auction = await this.auctionRepository.getAuctionWithCode(
      auctionCode
    );
    console.log("the fetched auction", auction);
    if (!auction)
      throw new AppBaseError(
        AppBaseError.EErrorCodes.RESOURCE_NOT_FOUND_ERROR,
        "Cette vente n'existe pas",
        404
      );

    if (["PENDING", "COMPLETED"].includes(auction.status))
      throw new AppBaseError(
        AppBaseError.EErrorCodes.BAD_REQUEST_ERROR,
        "Cette vente n'est pas encore ouverte ou alors elle est terminée",
        400
      );

    let currentLot;

    for (const lot of auction.lots)
      if (lot.status === "ON_SALE") currentLot = { ...lot };

    // aucun lot n'est en vente pourtant la vente est en cours, alors on va mettre le lot ayant le plus petit rank en vente
    if (!currentLot && auction.status === "IN_PROGRESS") {
      currentLot = auction.lots
        .filter((lot) => lot.status === "PENDING")
        .sort((a, b) => a.rank - b.rank)[0];

      // aucun lot n'est en attente, ni en cours de vente,  donc on ferme la vente aux encheres
      if (!currentLot) {
        // fermer la vente
        closeAuction(auctionCode);
        throw new AppBaseError(
          AppBaseError.EErrorCodes.RESOURCE_NOT_FOUND_ERROR,
          "Tous les lots de cette vente sont deja vendus - La vente est terminée",
          400
        );
      }

      // il y a un lot qui n'est pas en cours de vente et qui a le meilleur ranking
      // on va donc mettre ce lot en vente
      console.log("Opening a new lot");
      currentLot = await this.openLot(currentLot._id);
      return currentLot;
    }
    // on a trouvé un lot qui est ouvert

    // reccuperer les differentes encheres sur le lot
    currentLot.bids = await this.bidRepository.getAllBidsForLot(currentLot._id);

    // si la derniere enchere a deja ecoulé son temps d'adjudication, alors, on valide et on ferme le lot
    if (
      currentLot.bids.length > 0 &&
      MathUtils.isAfter(new Date(currentLot.bids[0].createdAt), new Date())
    ) {
      console.log("Closing a lot");
      currentLot = await this.closeLot(currentLot._id);

      // cette instruction permettra d'ouvir le prochain lot ou de fermermer l'enchere si necessaire
      return await this.getCurrentLotForAuction(auctionCode);
    }

    console.debug("before");
    console.log("the current lot", currentLot);
    console.debug("after");
    return currentLot;
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
      let auctions = await this.userRepository.getAllAuctionsAsParticipant(
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

    // créer le code de la vente
    auctionDoc["code"] = uuidv4();

    // enregistrer tous les participants
    const users = await this.registerUsers(
      auctionDoc.participants,
      auctionDoc.anonymous === true,
      auctionDoc.code
    );
    auctionDoc.participants = users;
    // envoyer les invitations aux participants
    for (const user of users)
      await GoogleMailService.sendMail({
        to: user.email,
        auctionCode: auctionDoc.code,
        auctionName: auctionDoc.name,
        adminName: auctionDoc.admin.name,
        adminEmail: auctionDoc.admin.email,
        userId: user._id,
      });

    // creer les differents lots
    let lots = [];
    for (const lot of auctionDoc.lots) {
      const lotDoc = await this.createLot(lot);
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
