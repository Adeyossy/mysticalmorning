import { Delivery } from "./delivery";
import { ProductInOrder } from "./product";

export type Order = {
  userId: string; // piped from user observable
  id: string; // generated with doc() and setDoc()
  items: ProductInOrder[]; // piped from the product selection page
  total: number; // piped from summing the cost of each item
  orderDate: number; // piped in line
  deliveryDate: number; // piped from date selected
  deliveryDayOfWeek: string;
  delivery: Delivery | null; // piped from fetched delivery data
  deliveryFee: number; // calculated from discounts e.g. socials and app installs
  deliveryTime: number; // time it was delivered
  paymentMode: 'online' | 'ondelivery' ; // supplied by the user's
  isConfirmed: boolean; // defaults to false until changed by user
  isDelivered: boolean; // defaults to false until changed by user
  isCancelled: boolean; // defaults to false until changed by user
  subscriptionId: string; // empty string if it is not tied to a subscription
}