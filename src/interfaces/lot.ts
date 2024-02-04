import { BidInterface } from "./bid";
import { DateString } from "./global";

export interface LotInterface {
  _id?: string;
  name: string;
  description: string;
  rank?: number;
  status?: "PENDING" | "ON_SALE" | "SOLD";
  bounty: number;
  awardDeadline: number;
  bids?: BidInterface<string>[];
  readonly createdAt?: DateString;
  readonly updatedAt?: DateString;
  [key: string]: string | DateString | number | undefined | BidInterface<string>[];
}
