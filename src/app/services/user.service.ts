import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { concatMap, map } from 'rxjs';
import { collection, doc, setDoc } from 'firebase/firestore';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private authService: AuthService) { }

  createUserDocument(user: User) {
    return this.authService.getFirestore$().pipe(
      map(db => collection(db, 'users')),
      map(usersRef => doc(usersRef, user.id)),
      concatMap(docRef => setDoc(docRef, user))
    )
  }
}
