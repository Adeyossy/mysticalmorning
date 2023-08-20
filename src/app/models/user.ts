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
  deliveryAddress: string;
  deliveryBackup: string;
}