import { Component } from '@angular/core';
import { Product } from './models/product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isModalShown = false;
  preorderMessage = 'Hello, I would like to order sandwich and coffee drink against tomorrow morning. I would like it delivered by 8am. My location is ________';

  subscribeMessage = 'Hello, I would like to subscribe to your breakfast service. I would like to have sandwich and coffee (insert any other dish on our menu) every morning at 8.00am from Monday to Friday. You can deliver to _____________ location.';


  toggleModal(): void {
    this.isModalShown = !this.isModalShown;
  }
  
}
