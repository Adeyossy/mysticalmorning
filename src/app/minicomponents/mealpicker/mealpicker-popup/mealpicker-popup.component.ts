import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductAndId, ProductInOrder } from 'src/app/models/product';

@Component({
  selector: 'app-mealpicker-popup',
  templateUrl: './mealpicker-popup.component.html',
  styleUrls: ['./mealpicker-popup.component.css']
})
export class MealpickerPopupComponent implements OnInit {
  @Input() category = '';
  @Input() products: Observable<Product[]> = new Observable();
  @Output() selectEmitter = new EventEmitter<ProductInOrder>();

  constructor() { }

  ngOnInit(): void {
  }

  emitSelectEvent(product: Product) {
    const productInOrder: ProductInOrder = {
      productId: product.id,
      quantity: 1
    }
    this.selectEmitter.emit(productInOrder);
  }

}
