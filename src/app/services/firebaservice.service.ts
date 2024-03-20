import { Injectable } from '@angular/core';
import { AsyncSubject, concatMap, map, Observable } from 'rxjs';
import { FirebaseApp, FirebaseOptions, initializeApp } from 'firebase/app';
import { Auth, User, getAuth, createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  UserCredential,
  AuthErrorCodes,
  sendEmailVerification,
  signInAnonymously} from 'firebase/auth';
import { Firestore, getFirestore } from 'firebase/firestore';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FirebaserviceService {

  serverlessURL = "/.netlify/functions"

  asyncConfig$: AsyncSubject<FirebaseOptions>

  constructor(private httpClient: HttpClient) {
    this.asyncConfig$ = new AsyncSubject();
    this.httpClient.get(`${this.serverlessURL}/index`).subscribe(this.asyncConfig$);
  }

  getFirebaseConfig$(): AsyncSubject<FirebaseOptions> {
    if (this.asyncConfig$.closed)
      this.httpClient.get(`${this.serverlessURL}/index`).subscribe(this.asyncConfig$);
    return this.asyncConfig$;
  }
  
  getFirebaseApp$(): Observable<FirebaseApp> {
    return this.getFirebaseConfig$().pipe(map(config => initializeApp(config)));
  }

  getFirebaseAuth$(): Observable<Auth> {
    return this.getFirebaseApp$().pipe(map(app => getAuth(app)));
  }

  getFirebaseUser$(): Observable<User | null> {
    return this.getFirebaseAuth$().pipe(
      concatMap(auth => new Observable<User | null>((observer) => {
        return auth.onAuthStateChanged(
          user => observer.next(user),
          error => observer.error(error),
          () => observer.complete()
        )
      }))
    );
  }

  getFirestore$(): Observable<Firestore> {
    return this.getFirebaseApp$().pipe(
      map(app => getFirestore(app))
    );
  }

  anonLogin$() {
    return this.getFirebaseAuth$().pipe(
      concatMap(auth => signInAnonymously(auth))
    );
  }

  signUp$(email: string, password: string): Observable<UserCredential> {
    return this.getFirebaseAuth$().pipe(
      concatMap(auth => createUserWithEmailAndPassword(auth, email, password))
    );
  }

  login$(email: string, password: string): Observable<UserCredential> {
    return this.getFirebaseAuth$().pipe(
      concatMap(auth => signInWithEmailAndPassword(auth, email, password))
    );
  }

  isEmailVerified$() {
    return this.getFirebaseUser$().pipe(
      map(user => {
        if (user) return user.emailVerified;
        throw new Error(AuthErrorCodes.NULL_USER);
      })
    );
  }

  verifyEmail$() {
    // sendEmailVerification is missing actionCodeSettings
    // users should be able to enter a code to be verified
    return this.getFirebaseUser$().pipe(
      concatMap(user => {
        if (user) {
          console.log("url => ", window.location.origin);
          return sendEmailVerification(user, {
            url: `${window.location.origin}/profile/registration`
          });
        } else throw new Error(AuthErrorCodes.NULL_USER);
      })
    )
  }

}
