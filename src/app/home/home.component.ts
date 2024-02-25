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
    'sandwich', 'product_chocolate', 'product_sandwich', 'coffee', 'sandwich_chocolate_meal', 'sandwiches'
  ];

  productSandwich: Product = {
    name: 'Sandwich',
    category: 'Food',
    price: 500,
    description: ''
  }

  productChocolate: Product = {
    name: 'Chocolate',
    category: 'Drink',
    price: 500,
    description: ''
  }

  productMeal: Product = {
    name: 'Sandwich and Beverage',
    category: 'Meal',
    price: 799,
    description: ''
  }

  affordableProducts = [this.productSandwich, this.productChocolate, this.productMeal]

  more_products = ['fries'];

  stars = new Array(5);
}
