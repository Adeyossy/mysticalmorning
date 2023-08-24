import { Delivery } from "./delivery";
import { ProductInOrder } from "./product";

export type Order = {
  userId: string;
  id: string;
  items: ProductInOrder[];
  orderDate: number;
  deliveryDate: number;
  delivery: Delivery | null;
  total: number;
  deliveryFee: number;
  paymentMode: string;
  isConfirmed: boolean;
  isDelivered: boolean;
  isCancelled: boolean;
  subscriptionId: string;
}