const { AppBaseError } = require("../../errors/base");
const { UserModel } = require("../model/user");

class UserRepository {
  constructor(userModel) {
    // here
    this.userModel = UserModel;
  }

  async createUser(mail, anonymous, auctionCode, identifier) {
    const user = await this.userModel.create({
      email: mail,
      isAnonym: anonymous,
      auction: auctionCode,
      identifier: identifier,
    });

    return user;
  }

  async getAllAuctionsAsParicipant(userMail) {
    const userAuctions = await this.userModel
      .find({ email: userMail })
      .select("auction");
    if (!userAuctions || userAuctions == []) return [];
    return userAuctions;
  }

  async confirmParticipation(auctionCode, userId, response, name) {
    let data = { response: response == true ? "YES" : "NO" };
    // TODO: isAnonym update not working, correct it
    if (name) data = { ...data, isAnonym: false, name: name };
    const user = await this.userModel.updateOne(
      {
        auction: auctionCode,
        _id: userId,
        response: { $not: { $eq: "CANCELLED" } },
      },
      { $set: data }
    );

    if (!user) throw new AppBaseError("");

    return true;
  }

  async cancelUsersInvitation(auctionCode) {
    await this.userModel.UpdateMany(
      { auction: auctionCode, response: "PENDING" },
      { response: "CANCELLED" }
    );
  }
}

module.exports = { UserRepository };
