import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable, concatMap, map, mergeMap } from 'rxjs';
import { DocumentData, collection, getDocs, query, where } from 'firebase/firestore';
import { userIsNull } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  collection = "deliveries";

  constructor(private authService: AuthService) { }

  getDeliveryDetails$(): Observable<DocumentData[]> {
    return this.authService.getDocumentByUserId$(this.collection);
  }

  createDeliveryDetails() {}

  updateDeliveryDetails() {}

  deleteDeliveryDetails() {}
}
