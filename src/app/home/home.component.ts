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
    price: 399,
    description: ''
  }

  productChocolate: Product = {
    name: 'Chocolate',
    category: 'Drink',
    price: 399,
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

  preorderMessage = 'Hello, I would like to order sandwich and coffee drink against tomorrow morning. I would like it delivered by 8am. My location is ________';

  subscribeMessage = 'Hello, I would like to subscribe to your breakfast service. I would like to have sandwich and coffee (insert any other dish on our menu) every morning at 8.00am from Monday to Friday. You can deliver to _____________ location.';
  
  isModalShown = false;

  stars = new Array(5);
  
  toggleModal(): void {
    this.isModalShown = !this.isModalShown;
  }

  doStuff(): void {
    console.log('loaded');
  }

}
