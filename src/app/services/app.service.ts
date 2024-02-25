import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  isModalShown = false;

  constructor() { }

  toggleModal(): void {
    this.isModalShown = !this.isModalShown;
  }
}
