import { BidInterface } from "../../interfaces/bid";

export const getBestBid = (bids: BidInterface<string>[]) => {
  let max = 0;
  for (let i = 0; i < bids.length; i++) {
    if (bids[i].amount > max) {
      max = bids[i].amount;
    }
  }
  return max;
};