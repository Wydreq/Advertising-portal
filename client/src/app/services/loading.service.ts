import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  isLoading$ = new BehaviorSubject(false);

  constructor() {}

  startLoading() {
    this.isLoading$.next(true);
  }

  stopLoading() {
    this.isLoading$.next(false);
  }
}
