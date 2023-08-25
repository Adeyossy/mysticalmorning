import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ProductAndId } from '../models/product';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  products: Observable<ProductAndId[]> = new Observable();

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

}
