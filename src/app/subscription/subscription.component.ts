import { Component } from '@angular/core';

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent {
  steps = [
    {
      heading: "Choose the days of the week you want your food delivered",
      body: `You can order breakfast, lunch and/or dinner for each day of the week and Mystical 
      Morning will automagically deliver it to you on those days.`
    },
    {
      heading: "Choose the food you want for each day",
      body: `You can choose from any of our mystical meals for your breakfast, 
      lunch and/or dinner for each day of the week. You may be able to change your meal if you 
      want something else that morning, afternoon or evening.`
    },
    {
      heading: "Indicate where and when you want your food delivered",
      body: `e.g. I would like my breakfast delivered by 8:00am in UCH, Ibadan. You will be able 
      to send a message to Mystical Morning's WhatsApp line once you complete your subscription.`
    }
  ]

  nonAlphaNumeric = /\W/g;
}
