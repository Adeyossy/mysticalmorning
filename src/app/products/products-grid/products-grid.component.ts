import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { BasicOrder } from 'src/app/models/order';
import { Product } from 'src/app/models/product';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-products-grid',
  templateUrl: './products-grid.component.html',
  styleUrls: ['./products-grid.component.css']
})
export class ProductsGridComponent implements OnInit {
  @Input() products: Product[] = [];
  @Input() selectedProducts: string[] = [];
  @Output() addEmitter = new EventEmitter<Product>();
  @Output() productEmitter = new EventEmitter<Product>();
  @Output() removeEmitter = new EventEmitter<Product>();

  // emitChange(product: Product) {
  //   this.changeEmitter.emit(product);
  // }

  emitProduct(product: Product) {
    this.productEmitter.emit(product);
  }

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit(): void {
  }

  getProductCount(productId: string) {
    return this.selectedProducts.filter(s => s === productId).length;
  }
}
