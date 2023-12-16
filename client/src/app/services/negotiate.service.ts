import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NegotiateService {
  constructor(private http: HttpClient) {}

  startNegotiate(offerId: string, buyerMaxPrice: number) {
    return this.http.post('http://localhost:5000/api/v1/negotiation', {
      offerId,
      buyerMaxPrice,
    });
  }
}
