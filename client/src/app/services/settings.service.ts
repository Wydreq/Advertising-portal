import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { IAddress } from '../shared/models/user.model';
import { BehaviorSubject, Subject } from 'rxjs';
import { MessagesService } from './messages.service';

@Injectable({
  providedIn: 'root',
})
export class SettingsService implements OnInit {
  userAddresses = new Subject<IAddress[]>();
  constructor(
    private http: HttpClient,
    private messagesService: MessagesService
  ) {}

  ngOnInit(): void {
    this.getUserAddresses();
  }

  getUserAddresses() {
    this.http
      .get('http://localhost:5000/api/v1/address/get-user-addresses')
      .subscribe((resData: any) => {
        console.log(resData);
        this.userAddresses.next(resData.data);
      });
  }

  addNewAddress(
    street: string,
    houseNumber: string,
    city: string,
    country: string,
    postalCode: string,
    recieverFullName: string
  ) {
    const newAddress = {
      street,
      houseNumber,
      city,
      country,
      postalCode,
      recieverFullName,
    };
    return this.http.post('http://localhost:5000/api/v1/address', newAddress);
  }

  deleteAddress(addressId: string) {
    return this.http.delete(
      `http://localhost:5000/api/v1/address/${addressId}`
    );
  }

  changePassword(
    oldPassword: string,
    password: string,
    confirmPassword: string
  ) {
    return this.http.post('http://localhost:5000/api/v1/auth/change-password', {
      oldPassword,
      password,
      confirmPassword,
    });
  }
}
