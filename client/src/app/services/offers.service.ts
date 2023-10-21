import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class OffersService {
  constructor(private http: HttpClient) {}

  createNewOffer(offer: any) {
    return this.http.post(`http://localhost:5000/api/v1/offers`, offer);
  }

  uploadPhoto(photo: any) {
    return this.http.post(
      `http://localhost:5000/api/v1/offers/photoupload`,
      photo
    );
  }
}
