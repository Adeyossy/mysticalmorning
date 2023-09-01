import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Route } from '@angular/router';
import { Observable, concatMap, of } from 'rxjs';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product$: Observable<Product | undefined> = new Observable();

  constructor(private route: ActivatedRoute, private productService: ProductService) {
    this.product$ = this.route.paramMap.pipe(
      concatMap(paramMap => {
        const id = paramMap.get('id');
        if (id) return this.productService.getProductById$(id);
        else return of(undefined);
      })
    )
  }

  ngOnInit(): void {
  }

}
