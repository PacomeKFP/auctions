const mongoose = require("mongoose");
const isEmail = require("validator/lib/isEmail");
const uuidv4 = require("uuid").v4;

const auctionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    invitationsClosureDate: {
      // date de fermeture des inscriptions
      type: Date,
      required: true,
    },
    admin: {
      // les informations sur l'administrateur
      email: {
        type: String,
        required: true,
        validator: [isEmail],
      },
      name: {
        type: String,
        required: true,
      },
    },
    code: {
      // le code de la vente
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    currency: {
      type: String,
    },
    status: {
      // le status de la vente,[en attente -  en cours - terminée]
      type: String,
      enum: ["PENDING", "IN_PROGRESS", "COMPLETED"],
      default: "PENDING",
    },

    anonymous: {
      // savoir si on autorise les participants anonymes
      type: Boolean,
      default: false,
    },

    participants: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],

    lots: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Lot",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const AuctionModel = new mongoose.model("Auction", auctionSchema);

module.exports = { AuctionModel };
