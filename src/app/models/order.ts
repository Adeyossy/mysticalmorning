export type Order = {
  userId: string;
  id: string;
  items: string[];
  orderDate: number;
  deliveryDate: number;
  deliveryLocation: string;
  deliveryContact: string;
  price: number;
  paymentMode: string;
  isConfirmed: boolean;
  isDelivered: boolean;
  isCancelled: boolean;
  subscriptionId: string;
}