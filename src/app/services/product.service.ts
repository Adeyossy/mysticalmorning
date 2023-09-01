import { Injectable } from '@angular/core';
import { Product, ProductAndId } from '../models/product';
import { AuthService } from './auth.service';
import { concatMap, filter, find, map } from 'rxjs';
import { collection, getDocs } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[] = [];
  collection = "products";

  constructor(private authService: AuthService) { }

  /**
   * Returns a new observable of products:Product[] from the firestore database.
   * 
   * @returns an observable of products array
   */
  getProducts$() {
    return this.authService.getFirestore$().pipe(
      concatMap(db => getDocs(collection(db, this.collection))),
      map(snapshot => snapshot.docs.map(doc => {
        const product = doc.data() as Product;
        product.id = doc.id;
        return product;
      }))
    )
  }

  /**
   * Takes an id: string and returns its Observable.
   * @param id - the firestore Id for the product requested
   * @returns - an Observable of the found product or undefined if the product is not found
   */
  getProductById$(id: string) {
    // return this.products.find(product => product.id === id);
    return this.getProducts$().pipe(
      map(products => products.find(product => product.id === id))
    )
  }
}
