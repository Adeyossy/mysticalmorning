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

  getProducts$() {
    return this.authService.getFirestore$().pipe(
      concatMap(db => getDocs(collection(db, this.collection))),
      map(snapshot => snapshot.docs.map(doc => {
        return { id: doc.id, product: doc.data() as Product } as ProductAndId
      }))
    )
  }

  getProductById$(id: string) {
    // return this.products.find(product => product.id === id);
    return this.getProducts$().pipe(
      map(products => products.find(product => product.id === id))
    )
  }
}
