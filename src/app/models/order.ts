import { environment } from "src/environments/environment";
import { Product } from "./product";

export const ORDER_COLLECTION = environment.order;

export type TimeOfMeal = "Breakfast" | "Lunch" | "Dinner";

export interface Order {
  userId: string;
  orderId: string;
  items: string[];
  orderDate: number;
  timeOfMeal: "Breakfast" | "Lunch" | "Dinner";
  deliveryDate: number;
  deliveryLocation: string;
  deliveryContact: string; // can be used as a unique identifier
  deliveryBackup: string;
  price: number;
  paymentMethod: "cash" | "transfer" | "pos" | "card";
  isConfirmed: boolean;
  isDelivered: boolean;
  isCancelled: boolean;
  isNeglected: boolean;
  subscriptionId: string;
}

export class Order {
  userId = "";
  orderId = "";
  items: string[] = [];
  orderDate = 0;
  timeOfMeal: "Breakfast" | "Lunch" | "Dinner" = "Breakfast";
  deliveryDate = 0;
  deliveryLocation = "";
  deliveryContact = ""; // can be used as a unique identifier
  deliveryBackup = "";
  price = 0;
  paymentMethod: "cash" | "transfer" | "pos" | "card" = "transfer";
  isConfirmed = false;
  isDelivered = false;
  isCancelled = false;
  isNeglected = false;
  subscriptionId = "";
}

export type BasicOrder = {
  timeOfMeal: "Breakfast" | "Lunch" | "Dinner";
  items: Product[];
  price: number;
}

export type BasicOrderSummary = {
  timeOfMeal: "Breakfast" | "Lunch" | "Dinner";
  items: string;
  price: number;
}
