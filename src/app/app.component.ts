import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  products = [
    'sandwich', 'chocolate', 'jollof_rice', 'coffee', 'fries', 'sandwich_chocolate_meal', 'fried_rice', 'drink', 'sandwiches'
  ];

  preorderMessage = 'Hello, I would like to order sandwich and coffee drink against tomorrow morning. I would like it delivered by 8am. My location is _______________';

  subscribeMessage = 'Hello, I would like to subscribe to your breakfast service. I would like to have sandwich and coffee (insert any other dish on our menu) every morning at 8.00am from Monday to Friday. You can deliver to _____________ location.';
}
