import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class NegotiateService {
  constructor(private http: HttpClient) {}

  startNegotiate(
    offerId: string,
    buyerMaxPrice: number,
    deliveryAddress: string
  ) {
    return this.http.post('http://localhost:5000/api/v1/negotiation', {
      offerId,
      deliveryAddress,
      buyerMaxPrice,
    });
  }

  getAllBuyerNegotiations() {
    return this.http.get('http://localhost:5000/api/v1/negotiation/buyer');
  }

  getNegotiation(id: string | null) {
    return this.http.get(`http://localhost:5000/api/v1/negotiation/${id}`);
  }

  getNegotiationBids(id: string | null) {
    return this.http.get(`http://localhost:5000/api/v1/negotiation/${id}/bids`);
  }

  getOfferNegotiations(id: string | null) {
    return this.http.get(
      `http://localhost:5000/api/v1/negotiation/offerNegotiations/${id}`
    );
  }

  bidPrice(negotiationId: string | null, price: number) {
    return this.http.post(
      `http://localhost:5000/api/v1/negotiation/${negotiationId}/bid`,
      {
        price,
      }
    );
  }

  endNegotiation(negotiationId: string | null) {
    return this.http.get(
      `http://localhost:5000/api/v1/negotiation/${negotiationId}/end`
    );
  }

  acceptNegotiation(negotiationId: string | null) {
    return this.http.get(
      `http://localhost:5000/api/v1/negotiation/${negotiationId}/accept`
    );
  }
}
