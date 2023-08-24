export type User = {
  id: string;
  subscribed: boolean; // Is there an active subscription?
  name: string;
  username: string;
  contactPhone: string;
  email: string;
  emailVerified: boolean;
  facebookShare: number[];
  twitterShare: number[];
  instagramShare: number[];
  orders: string[];
  subscriptions: string[];
  delivery: string[]; // contains deliveryIds stored in deliveries collection
}

export const userIsNull = "user is null";