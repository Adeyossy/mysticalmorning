import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductAndId, ProductInOrder } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-mealpicker',
  templateUrl: './mealpicker.component.html',
  styleUrls: ['./mealpicker.component.css']
})
export class MealpickerComponent implements OnInit {
  @Input() productsAndIds: Observable<ProductAndId[]> = new Observable();
  meal: ProductInOrder[] = [];
  dialogShown = false;
  
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
  }

  selectItemById(id: string) {
  }

}
