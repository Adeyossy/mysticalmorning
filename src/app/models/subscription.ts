import { BasicOrder } from "./order";

export const SUBSCRIPTION_COLLECTION = "subscriptions";

export type DayOfWeek = "mondays" | "tuesdays" | "wednesdays" | "thursdays" | "fridays"
| "saturdays" | "sundays";

export interface Subscription {
  userId: string;
  subscriptionId: string;
  dateCreated: number;
  dateModified: number;
  dateCancelled: number;
  mondays: string; // an array of the ids of the order(s)
  tuesdays: string; // an array of the ids of the order(s)
  wednesdays: string; // an array of the ids of the order(s)
  thursdays: string; // an array of the ids of the order(s)
  fridays: string; // an array of the ids of the order(s)
  saturdays: string; // an array of the ids of the order(s)
  sundays: string; // an array of the ids of the order(s)
}

export class Subscription {
  userId = '';
  subscriptionId = '';
  dateCreated = 0;
  dateModified = 0;
  dateCancelled = 0;
  mondays: string = "";
  tuesdays: string = "";
  wednesdays: string = "";
  thursdays: string = "";
  fridays: string = "";
  saturdays: string = "";
  sundays: string = "";

  constructor(id: string, userId: string) {
    this.dateCreated = Date.now();
    this.dateModified = this.dateCreated;
    this.subscriptionId = id;
    this.userId = userId;
  }
}

export interface SubscriptionExpanded {
  mondays: BasicOrder[];
  tuesdays: BasicOrder[];
  wednesdays: BasicOrder[];
  thursdays: BasicOrder[];
  fridays: BasicOrder[];
  saturdays: BasicOrder[];
  sundays: BasicOrder[];
}
