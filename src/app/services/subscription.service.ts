import { Injectable } from '@angular/core';
import { Subscription } from '../models/subscription';
import { AuthService } from './auth.service';
import { concatMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  subscription: Subscription = {
    userId: '',
    id: '', // set with doc() and setDoc()
    dateCreated: 0, // set at the point of uploading to Firestore
    dateCancelled: 0, // date when the person cancelled the subscription
    durationInWeeks: 0,
    mondays: null, // Monday orders, if any
    tuesdays: null, // Tuesday orders, if any
    wednesdays: null, // Wednesday orders, if any
    thursdays: null, // Thursday orders, if any
    fridays: null, // Friday orders, if any
    others: null // Orders for other days, if any
  };

  collection = 'subscriptions';

  selectedDays: string[] = [];

  constructor(private authService: AuthService) { }

  createSubscription() {
    // this.subscription = {
    //   userId:
    // }
    this.authService.getFirebaseUser$().pipe(concatMap(user => user ? user.uid : ''))
  }

  setOrder() {
    // if (Mondays)
  }
}
