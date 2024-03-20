import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  isModalShown = false;
  products: Product[] = [];

  constructor(private firebaservice: FirebaseService) { }

  toggleModal(): void {
    this.isModalShown = !this.isModalShown;
  }
}
