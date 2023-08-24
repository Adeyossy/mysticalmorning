import { Injectable } from '@angular/core';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Product[] = []

  constructor() { }

  fetchProducts() {}

  getProductById(id: string): Product | undefined {
    return this.products.find(product => product.id === id);
  }
}
