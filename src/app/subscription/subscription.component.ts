import { Component } from '@angular/core';
import { SubscriptionService } from '../services/subscription.service';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent {
  declare steps: {heading: string; body: string}[];
  nonAlphaNumeric = /\W/g;

  constructor(private subService: SubscriptionService) {
    this.steps = subService.steps;
  }
}
