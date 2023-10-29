import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { OffersRes } from '../models/offers.model';
import { OfferRes } from '../my-offers/offer-details/offer-details.component';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { encode } from 'base64-arraybuffer';

@Injectable({
  providedIn: 'root',
})
export class OffersService {
  offers = new Subject<OffersRes>();
  isLoading = new BehaviorSubject<boolean>(false);
  userOffers = new Subject<OffersRes>();

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

  getSpecificUserOffers() {
    this.isLoading.next(true);
    return this.http
      .get<OffersRes>('http://localhost:5000/api/v1/offers/myOffers/all')
      .subscribe(
        (resData) => {
          this.userOffers.next(resData);
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

  createNewOffer(offer: any, image: any): Observable<any> {
    console.log(image);
    return this.http.post(
      'http://localhost:5000/api/v1/offers/uploadPhoto',
      image
    );
    return this.http.post(`http://localhost:5000/api/v1/offers`, offer);
  }

  uploadPhoto(photo: FormData) {
    const HttpUploadOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'multipart/form-data' }),
    };
    return this.http.post(
      `http://localhost:5000/api/v1/offers/photoupload`,
      photo,
      HttpUploadOptions
    );
  }

  deleteOffer(id: string) {
    return this.http.delete(`http://localhost:5000/api/v1/offers/${id}`);
  }

  editOffer(offer: any, image: any, id: string | null): Observable<any> {
    // return this.http.post(
    //   'http://localhost:5000/api/v1/offers/uploadPhoto',
    //   image
    // );
    return this.http.put(`http://localhost:5000/api/v1/offers/${id}`, offer);
  }
}
