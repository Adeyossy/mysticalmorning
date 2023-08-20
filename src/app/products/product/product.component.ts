import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  @Input() product: Product = { name: '', category: '', price: 0, description: '' }

  @Input() showDescription = false;

  constructor() { }

  ngOnInit(): void {
  }

  getProductName(name: string): string {
    return name.split(' ').join('_');
  }

}
