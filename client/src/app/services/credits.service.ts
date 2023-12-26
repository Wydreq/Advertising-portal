import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CreditsService implements OnInit {
  constructor(private http: HttpClient) {}

  credits = new BehaviorSubject<Number | undefined>(0);

  ngOnInit(): void {
    this.refreshCredits();
  }

  refreshCredits() {
    this.http
      .get('http://localhost:5000/api/v1/auth/me')
      .subscribe((resData: any) => {
        this.credits.next(resData.data.credits);
        console.log('Credits', resData.data.credits);
      });
  }
}
