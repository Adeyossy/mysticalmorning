import { Injectable } from '@angular/core';
import { Product, ProductInOrder } from '../models/product';
import { Order } from '../models/order';
import { ProductService } from './product.service';
import { AuthService } from './auth.service';
import { concatMap } from 'rxjs';
import { addDoc, collection, doc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  collection = "orders";

  order: Order = {
    userId: '',
    id: '',
    items: [],
    orderDate: 0,
    deliveryDate: 0,
    delivery: null,
    total: 0,
    deliveryFee: 0,
    paymentMode: 'ondelivery',
    isConfirmed: false,
    isDelivered: false,
    isCancelled: false,
    subscriptionId: '',
  }

  constructor(private productService: ProductService,
    private authService: AuthService) { }

  // setOrderItemsAndCost(productsInOrder: ProductInOrder[]): void {
  //   this.order.items = productsInOrder;
  //   const costs = productsInOrder.map(productInOrder => (this.productService
  //     .getProductById(productInOrder.productId) as Product).price * productInOrder.quantity);
  //   this.order.total = costs.reduce((acc, curr) => acc + curr);
  // }

  setOrderDate() {
    this.order.orderDate = Date.now();
  }

  setDeliveryDate(date: number) {
    this.order.deliveryDate = date;
  }

  setDelivery() {}

  setSubscriptionId() {}

  createOrder$(order: Order) {
    this.authService.getFirebaseUser$()
    return this.authService.getFirestore$().pipe(
      concatMap(db => addDoc(collection(db, this.collection), order))
    )
  }
}
