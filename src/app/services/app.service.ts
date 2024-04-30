import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  isModalShown = false;
  products: Product[] = [];

  constructor(private firebaservice: FirebaseService) {
    // this.fetchProducts();
  }

  toggleModal(): void {
    this.isModalShown = !this.isModalShown;
  }

  fetchProducts() {
    const fetchSub = this.firebaservice.getCollection$<Product>("products").subscribe({
      next: (value) => {
        this.products = value;
        fetchSub.unsubscribe();
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        fetchSub.unsubscribe();
      }
    })
  }

  getProducts() {
    if (this.products.length === 0) {}
    return this.products;
  }
}
