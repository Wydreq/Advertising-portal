import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OffersRes } from '../shared/models/offers.model';
import { OfferRes } from '../my-offers/offer-details/offer-details.component';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OffersService {
  offers = new Subject<OffersRes>();
  userOffers = new Subject<OffersRes>();

  constructor(private http: HttpClient) {}

  getAllOffers() {
    return this.http
      .get<OffersRes>('http://localhost:5000/api/v1/offers')
      .subscribe(
        (resData) => {
          this.offers.next(resData);
        },
        (err) => {}
      );
  }

  getActiveOffers() {
    return this.http
      .get<OffersRes>('http://localhost:5000/api/v1/offers?status=new')
      .subscribe(
        (resData) => {
          this.offers.next(resData);
        },
        (err) => {}
      );
  }

  getFilteredOffers(options: any) {
    let url = '';
    console.log(options);

    if (options.content !== '') {
      url = `http://localhost:5000/api/v1/offers?name=${options.content}&category=${options.category.name}`;
    } else {
      url = `http://localhost:5000/api/v1/offers?category=${options.category.name}`;
    }

    return this.http.get<OffersRes>(url).subscribe(
      (resData) => {
        this.offers.next(resData);
      },
      (err) => {}
    );
  }

  addOfferView(id: string | null) {
    return this.http
      .put(`http://localhost:5000/api/v1/offers/${id}/addOfferView`, {})
      .subscribe();
  }

  addPhoneNumberView(id: string | null) {
    return this.http
      .put(`http://localhost:5000/api/v1/offers/${id}/addPhoneNumberView`, {})
      .subscribe();
  }

  getSpecificUserOffers() {
    return this.http
      .get<OffersRes>('http://localhost:5000/api/v1/offers/myOffers/all')
      .subscribe(
        (resData) => {
          this.userOffers.next(resData);
        },
        (err) => {}
      );
  }

  getSingleOffer(id: string | null) {
    return this.http.get<OfferRes>(`http://localhost:5000/api/v1/offers/${id}`);
  }

  uploadPhoto(image: any): Observable<any> {
    const formData = new FormData();
    formData.append('image', image, image.name);

    console.log('tutaj');

    return this.http.post(
      `http://localhost:5000/api/v1/offers/upload/photo`,
      formData
    );
  }

  createNewOffer(offer: any): Observable<any> {
    return this.http.post(`http://localhost:5000/api/v1/offers`, offer);
  }

  deleteOffer(id: string) {
    return this.http.delete(`http://localhost:5000/api/v1/offers/${id}`);
  }

  editOffer(offer: any, image: any, id: string | null): Observable<any> {
    return this.http.put(`http://localhost:5000/api/v1/offers/${id}`, offer);
  }
}
