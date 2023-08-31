import { Component, Input, OnInit } from '@angular/core';
import { Observable, filter, map, of } from 'rxjs';
import { Product, ProductAndId, ProductInOrder } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-mealpicker',
  templateUrl: './mealpicker.component.html',
  styleUrls: ['./mealpicker.component.css']
})
export class MealpickerComponent implements OnInit {
  @Input() products: Observable<Product[]> = new Observable();
  foodProducts = new Observable<Product[]>();
  drinkProducts = new Observable<Product[]>();
  meal: ProductInOrder[] = [];
  dialogShown = false;
  
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.products = this.productService.getProducts$();
    this.foodProducts = this.products.pipe(map(products => products.
      filter(product => product.category.toLowerCase() === 'food')));
    this.drinkProducts = this.products.pipe(map(products => products.
      filter(product => product.category.toLowerCase() === 'drink')));
  }

  selectItemById(id: string) {
  }

}
