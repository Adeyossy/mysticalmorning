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
    id: '',
    dateCreated: 0,
    dateCancelled: 0,
    mondays: null,
    tuesdays: null,
    wednesdays: null,
    thursdays: null,
    fridays: null,
    others: null
  };

  collection = 'subscriptions';

  constructor(private authService: AuthService) { }

  createSubscription() {
    // this.subscription = {
    //   userId:
    // }
    this.authService.getFirebaseUser$().pipe(concatMap(user => user ? user.uid : ''))
  }
}
