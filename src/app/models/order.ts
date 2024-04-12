export type Order = {
  userId: string;
  orderId: string;
  items: string[];
  orderDate: number;
  timeOfMeal: "breakfast" | "lunch" | "dinner";
  deliveryDate: number;
  deliveryLocation: string;
  deliveryContact: string;
  price: number;
  paymentMethod: "cash" | "transfer" | "pos" | "card";
  isConfirmed: boolean;
  isDelivered: boolean;
  isCancelled: boolean;
  isNeglected: boolean;
  subscriptionId: string;
}