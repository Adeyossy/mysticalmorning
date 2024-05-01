import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {  
  daysOfTheWeek = ["Mondays", "Tuesdays", "Wednesdays", "Thursdays", "Fridays", "Saturdays", "Sundays"];
  selectedDays = this.daysOfTheWeek.map(day => "");
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
    },
    {
      heading: "Notify us on WhatsApp",
      body: `Your order will be automatically converted to a message you can send to us on 
      WhatsApp. It allows you to notify us immediately and acts as a backup.`
    }
  ]

  constructor() { }

  getSelectedDays() {
    return this.selectedDays.filter(day => day !== "");
  }
}
