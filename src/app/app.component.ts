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
}
