import { Injectable } from '@angular/core';
import { PRODUCT_DOES_NOT_EXIST, Product, ProductInOrder } from '../models/product';
import { Order } from '../models/order';
import { ProductService } from './product.service';
import { AuthService } from './auth.service';
import { Observable, concatMap, map } from 'rxjs';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { userIsNull } from '../models/user';
import { Delivery } from '../models/delivery';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  collection = "orders";

  order: Order = {
    userId: '', // set this at the point of creating an order on Firebase
    id: '',
    items: [],
    total: 0,
    orderDate: 0,
    deliveryDate: 0,
    deliveryDayOfWeek: '',
    delivery: null,
    deliveryFee: 0,
    deliveryTime: 0,
    paymentMode: 'ondelivery',
    isConfirmed: false,
    isDelivered: false,
    isCancelled: false,
    subscriptionId: ''
  }

  constructor(private productService: ProductService,
    private authService: AuthService) { }

  /**
   * @throws If a user does not exist
   * 
   * @returns An observable of the result of creating the order
   */
  createOrder$(): Observable<void> {
    return this.authService.getFirebaseUser$().pipe(
      concatMap(user => {
        if (user) {
          return this.authService.getFirestore$().pipe(
            map(db => doc(collection(db, this.collection))),
            concatMap(docRef => {
              this.order.id = docRef.id;
              this.order.userId = user.uid;
              this.order.orderDate = Date.now();
              return setDoc(docRef, this.order);
            })
          );
        } else throw new Error(userIsNull);
      })
    )
  }

  createOrderFromOrder$(order: Order): Observable<void> {
    return this.authService.getFirebaseUser$().pipe(
      concatMap(user => {
        if (user) {
          return this.authService.getFirestore$().pipe(
            map(db => doc(collection(db, this.collection))),
            concatMap(docRef => {
              order.id = docRef.id;
              order.userId = user.uid;
              order.orderDate = Date.now();
              return setDoc(docRef, order);
            })
          );
        } else throw new Error(userIsNull);
      })
    )
  }

  setOrderItemsAndCost(productsInOrder: ProductInOrder[]): void {
    this.order.items = productsInOrder;
    this.productService.getProducts$().subscribe({
      next: products => {
        const costs = productsInOrder.map(productInOrder => {
          const product = products.find(product => product.id === productInOrder.productId);
          if (!product) throw new Error(PRODUCT_DOES_NOT_EXIST);
          return product.product.price * productInOrder.quantity
        });

        this.order.total = costs.reduce((acc, curr) => acc + curr);
      },
      error: (err) => {
        console.log('An error occurred: ', err);
      }
    })
  }

  setOrderDate() {
    this.order.orderDate = Date.now();
  }

  setDeliveryDate(date: number) {
    this.order.deliveryDate = date;
  }

  setDelivery(delivery: Delivery) {
    this.order.delivery = delivery;
  }

  // Called if the order is part of a subscription
  setSubscriptionId() { }


}
