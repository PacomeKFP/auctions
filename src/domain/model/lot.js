const mongoose = require("mongoose");

const lotSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    rank: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "ON_SALE", "SOLD"],
      default: "PENDING",
    },
    bounty: {
      // la mise à prix de l'article
      type: Number,
      required: true,
    },
    awardDeadline: {
      // delais d'adjudication, nombre de secondes min 15secs
      type: Number,
      default: process.env.DEFAULT_AWARD_DEADLINE | 15,
    },
    bids: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Bid",
      },
    ],
  },
  { timestamps: true }
);

const LotModel = new mongoose.model("Lot", lotSchema);

module.exports = { LotModel };
