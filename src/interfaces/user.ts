import { DateString } from "./global";

export interface UserInterface {
  _id: string;
  name: string;
  email: string;
  identifier: string;
  auction: string;
  response: string;
  readonly createdAt?: DateString;
  readonly updatedAt?: DateString;
  [key: string]: string | DateString | number | undefined;
}
