import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PurchasesService {
  constructor(private http: HttpClient) {}

  getUserSoldItems() {
    return this.http.get('http://localhost:5000/api/v1/purchases/sold');
  }

  getUserPurchasedItems() {
    return this.http.get('http://localhost:5000/api/v1/purchases/purchased');
  }

  setItemOnDelivery(id: string) {
    return this.http.get(
      `http://localhost:5000/api/v1/purchases/${id}/delivery`
    );
  }

  setItemDelivered(id: string) {
    return this.http.get(
      `http://localhost:5000/api/v1/purchases/${id}/delivered`
    );
  }

  purchaseItem(id: string, addressId: string) {
    return this.http.post(`http://localhost:5000/api/v1/purchases/${id}/buy`, {
      deliveryAddress: addressId,
    });
  }
}
