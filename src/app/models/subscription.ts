export type Subscription = {
  userId: string;
  subscriptionId: string;
  dateCreated: number;
  dateModified: number;
  dateCancelled: number;
  mondays: string[]; // an array of the ids of the order(s)
  tuesdays: string[]; // an array of the ids of the order(s)
  wednesdays: string[]; // an array of the ids of the order(s)
  thursdays: string[]; // an array of the ids of the order(s)
  fridays: string[]; // an array of the ids of the order(s)
  saturdays: string[]; // an array of the ids of the order(s)
  sundays: string[]; // an array of the ids of the order(s)
}