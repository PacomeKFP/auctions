import { DateString } from "./global";
import { LotInterface } from "./lot";
import { UserInterface } from "./user";

export interface AuctionInterface<T extends ParticipantType> {
  _id?: string;
  name: string;
  startDate: DateString;
  invitationsClosureDate: DateString;
  description: string;
  admin: AdminInfo;
  code?: string;
  currency: string;
  userId?: string;
  status?: AuctionStatus;
  anonymous: boolean;
  participants: T;
  lots: LotInterface[];
  lotWithoutRanks?: LotInterface[];
  readonly createdAt?: DateString;
  readonly updatedAt?: DateString;
  response?: UserResponseOnAuction;

  [key: string]:
    | string
    | DateString
    | number
    | boolean
    | undefined
    | string[]
    | UserInterface[]
    | LotInterface[]
    | AdminInfo;
}

export type UserResponseOnAuction = "PENDING" | "YES" | "NO" | "CANCELLED";

type ParticipantType = string[] | UserInterface[] | number;
export type AuctionStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED";

type AdminInfo = {
  name: string;
  email: string;
};
