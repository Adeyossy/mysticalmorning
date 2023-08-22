import { Order } from "./order";

export type Subscription = {
  userId: string;
  id: string;
  dateCreated: number;
  dateCancelled: number;
  mondays: Order | null;
  tuesdays: Order | null;
  wednesdays: Order | null;
  thursdays: Order | null;
  fridays: Order | null;
  others: Order | null;
}