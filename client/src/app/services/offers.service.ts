import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OffersRes } from '../models/offers.model';
import { OfferRes } from '../my-offers/offer-details/offer-details.component';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OffersService {
  offers = new Subject<OffersRes>();
  isLoading = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  getAllOffers() {
    this.isLoading.next(true);
    return this.http
      .get<OffersRes>('http://localhost:5000/api/v1/offers')
      .subscribe(
        (resData) => {
          this.offers.next(resData);
          this.isLoading.next(false);
        },
        (err) => {
          this.isLoading.next(false);
        }
      );
  }

  getSingleOffer(id: string | null) {
    return this.http.get<OfferRes>(`http://localhost:5000/api/v1/offers/${id}`);
  }

  createNewOffer(offer: any) {
    return this.http.post(`http://localhost:5000/api/v1/offers`, offer);
  }

  uploadPhoto(photo: FormData) {
    return this.http.post(
      `http://localhost:5000/api/v1/offers/photoupload`,
      photo
    );
  }
}
