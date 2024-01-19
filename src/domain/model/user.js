const { boolean } = require("joi");
const mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      validator: [isEmail],
    },
    name: {
      type: String,
    },
    isAnonym: {
      type: Boolean,
    },
    identifier: {
      type: String,
      required: true,
    },
    authToken: {
      type: String,
    },
    tokenCreatedAt: {
      type: Date,
    },
    auction: {
      // le code de l'auction
      type: String,

      ref: "Auction.code",
      required: true,
    },
    response: {
      type: String,
      enum: ["PENDING", "YES", "NO", "CANCELLED"], // les reponses possibles une fois l'invitation envoyée.
      default: "PENDING", // L'email a ete envoyé
    },
  },
  { timestamps: true }
);

const UserModel = new mongoose.model("User", userSchema);

module.exports = { UserModel };
