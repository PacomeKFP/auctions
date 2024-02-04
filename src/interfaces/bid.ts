import { DateString } from "./global";
import { LotInterface } from "./lot";
import { UserInterface } from "./user";

export interface BidInterface<T extends string | UserInterface> {
  _id: string;
  lot: string | LotInterface;
  user: T;
  amount: number;
  date: DateString;
  readonly createdAt?: DateString;
  readonly updatedAt?: DateString;
  [key: string]:
    | string
    | DateString
    | number
    | undefined
    | UserInterface
    | LotInterface;
}
