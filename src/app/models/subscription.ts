import { Order } from "./order";

export type Subscription = {
  userId: string;
  id: string;
  dateCreated: number;
  dateCancelled: number;
  durationInWeeks: number; // Makes most sense in weeks, but milliseconds is fine too
  mondays: Order | null;
  tuesdays: Order | null;
  wednesdays: Order | null;
  thursdays: Order | null;
  fridays: Order | null;
  others: Order | null;
}