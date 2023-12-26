import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private http: HttpClient, private router: Router) {}

  startPayment() {
    const headers = new HttpHeaders({
      'Content-Type': 'text/html',
    });

    this.http
      .post('http://localhost:5000/api/v1/payment', {}, { headers })
      .subscribe((res: any) => {
        console.log(res.url);
        window.location.href = res.url;
      });
  }

  recievePayment(id: string | null) {
    return this.http.get(`http://localhost:5000/api/v1/payment/${id}`);
  }
}
