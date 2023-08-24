export type User = {
  userId: string;
  subscribed: boolean; // Is there an active subscription?
  name: string;
  username: string;
  contactPhone: string;
  email: string;
  emailVerified: boolean;
  facebookShare: boolean;
  twitterShare: boolean;
  instagramShare: boolean;
  delivery: string[]; // contains deliveryIds stored in deliveries collection
}

export const userIsNull = "user is null";