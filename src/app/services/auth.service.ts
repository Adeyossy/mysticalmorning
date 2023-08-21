import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';
import { Auth, User, UserCredential, createUserWithEmailAndPassword, getAuth, sendEmailVerification, signInWithEmailAndPassword } from 'firebase/auth';
import { Observable, concatMap, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  // This method fetches the firebase config observable from the serverless function
  fetchFirebaseConfig$(): Observable<FirebaseOptions> {
    return this.http.get<FirebaseOptions>('/.netlify/functions/index');
  }

  getFirebaseApp$(): Observable<FirebaseApp> {
    return this.fetchFirebaseConfig$().pipe(
      map(config => initializeApp(config))
    )
  }

  getFirebaseAuth$(): Observable<Auth> {
    return this.getFirebaseApp$().pipe(map(app => getAuth(app)));
  }

  getFirebaseUser$(): Observable<User | null> {
    return this.getFirebaseAuth$().pipe(
      concatMap(auth => {
        return new Observable<User | null>(observer => {
          return auth.onAuthStateChanged(
            user => observer.next(user),
            error => observer.error(error),
            () => observer.complete()
          )
        })
      }));
  }

  login(email: string, password: string): Observable<UserCredential> {
    return this.getFirebaseAuth$().pipe(
      concatMap(auth => from(signInWithEmailAndPassword(auth, email, password)))
    );
  }

  signup(email: string, password: string): Observable<UserCredential> {
    return this.getFirebaseAuth$().pipe(
      concatMap(auth => from(createUserWithEmailAndPassword(auth, email, password)))
    );
  }

  verifyEmail() {
    return this.getFirebaseUser$().pipe(
      concatMap(user => sendEmailVerification(user as User, {
        url: 'https://mysticalmorning.com/'
      }))
    )
  }

  resetPassword() {
  }
}
