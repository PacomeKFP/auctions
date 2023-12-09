const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
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
      type: String,
      enum: ["PENDING", "INPROGRESS", "COMPLETED"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
  }
);

const AuctionModel = new mongoose.model("Auctions", auctionSchema);

module.exports = { AuctionModel };

