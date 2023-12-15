const { MathUtils } = require("../../utils/maths");
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

  async confirmParticipation(auctionCode, userId, response) {
    const user = await this.userModel.findOneAndUpdate(
      { auction: auctionCode, _id: userId, response: { $not: "CANCELLED" } },
      { response: response == true ? "YES" : "NO" }
    );

    if (!user) return false;

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
