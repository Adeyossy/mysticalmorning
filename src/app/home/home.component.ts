import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(public appService: AppService) {}

  ngOnInit() {
  }
  
  products = [
    'sandwich', 'product_spaghetti', 'spaghetti.in.pan', 'coffee', 'product_rice', 'sandwiches'
  ];

  productFries: Product = {
    name: 'Fries',
    category: 'Food',
    price: 600,
    description: ''
  }

  productSpaghetti: Product = {
    name: 'Spaghetti',
    category: 'Food',
    price: 700,
    description: ''
  }

  productRice: Product = {
    name: 'Rice',
    category: 'Food',
    price: 2500,
    description: ''
  }

  affordableProducts = [this.productFries, this.productSpaghetti, this.productRice]

  more_products = ['product_fries'];

  stars = new Array(5);
}
