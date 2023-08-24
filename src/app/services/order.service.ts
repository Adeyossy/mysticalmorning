import { Injectable } from '@angular/core';
import { Product, ProductInOrder } from '../models/product';
import { Order } from '../models/order';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  order: Order = {
    userId: '',
    id: '',
    items: [],
    orderDate: 0,
    deliveryDate: 0,
    delivery: null,
    total: 0,
    deliveryFee: 0,
    paymentMode: '',
    isConfirmed: false,
    isDelivered: false,
    isCancelled: false,
    subscriptionId: '',
  }

  constructor(private productService: ProductService) { }

  setOrderItemsAndCost(productsInOrder: ProductInOrder[]): void {
    this.order.items = productsInOrder;
    const costs = productsInOrder.map(productInOrder => (this.productService
      .getProductById(productInOrder.productId) as Product).price * productInOrder.quantity);
    this.order.total = costs.reduce((acc, curr) => acc + curr);
  }

  setOrderDate() {
    this.order.orderDate = Date.now();
  }

  setDeliveryDate(date: number) {
    this.order.deliveryDate = date;
  }

  setDelivery() {}

  setPaymentMode(mode: string) {
    this.order.paymentMode = mode;
  }

  setSubscriptionId() {}
}
