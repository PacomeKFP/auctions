const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema(
  {
    lot: {
      type: mongoose.Types.ObjectId,
      ref: "Lots",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const BidModel = new mongoose.model("Bid", bidSchema);

module.exports = { BidModel };
