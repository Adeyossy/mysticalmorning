import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
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
  
  isModalShown = false;

  stars = new Array(5);
  
  toggleModal(): void {
    this.isModalShown = !this.isModalShown;
  }

  doStuff(): void {
    console.log('loaded');
  }

}
