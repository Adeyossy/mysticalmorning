import { Component, OnInit } from '@angular/core';
import { Product } from '../models/product';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products = [
    'sandwich', 'product_spaghetti', 'spaghetti.in.pan', 'coffee', 'product_rice', 'sandwiches'
  ];
  
  productFries = new Product("", "Potatoes and Eggs", 700, "Food");
  productSpaghetti = new Product("", "Spaghetti Stirfry", 800, "Food");
  productRice = new Product("", "Mystical Jollof Rice", 2500, "Food");
  
  affordableProducts = [this.productFries, this.productSpaghetti, this.productRice]
  
  more_products = ['product_fries'];
  
  stars = new Array(5);
  
  constructor(public appService: AppService) {
    this.productFries.images = "../../../assets/images/product_fries.jpg";
    this.productSpaghetti.images = "../../../assets/images/product_spaghetti.jpg";
    this.productRice.images = "../../../assets/images/product_rice.jpg";
  }
  
  ngOnInit() {
  }
}
