import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OffersService } from 'src/app/services/offers.service';
import { Observable } from 'rxjs';
import { Message } from 'primeng/api';
import { MessagesService } from 'src/app/services/messages.service';
import { Router } from '@angular/router';
import { CloudinaryResponse } from 'src/app/shared/models/cloudinaryRes.model';

interface Category {
  name: string;
  code: string;
}

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.component.html',
  styleUrls: ['./new-offer.component.css'],
})
export class NewOfferComponent implements OnInit {
  newOfferForm!: FormGroup;
  categories: Category[] | undefined;
  messages: Message[] = [];
  photoUrl: string = '';

  image: any;

  constructor(
    private offersService: OffersService,
    private messagesService: MessagesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.messagesService.messages$.subscribe((messages) => {
      this.messages = messages;
    });
    this.categories = [
      { name: 'Electronics', code: 'Electronics' },
      { name: 'Health', code: 'Health' },
      { name: 'Fashion', code: 'Fashion' },
      { name: 'Beauty', code: 'Beauty' },
      { name: 'Garden', code: 'Garden' },
      { name: 'Gaming', code: 'Gaming' },
    ];
    this.newOfferForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      category: new FormControl('Electronics', Validators.required),
      description: new FormControl(null, [
        Validators.required,
        Validators.maxLength(1500),
      ]),
      price: new FormControl(null, [
        Validators.required,
        Validators.maxLength(5),
      ]),
      negotiate: new FormControl(false, Validators.required),
      phone: new FormControl(null, [
        Validators.required,
        Validators.maxLength(20),
      ]),
      address: new FormControl(null, Validators.required),
      image: new FormControl(null),
    });
  }

  onFileSelect(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.image = file;
    }
  }

  onSubmitForm() {
    const sendingForm = {
      name: this.newOfferForm.value.name,
      category: this.newOfferForm.value.category,
      description: this.newOfferForm.value.description,
      price: this.newOfferForm.value.price,
      negotiate: this.newOfferForm.value.negotiate,
      phone: this.newOfferForm.value.phone,
      address: this.newOfferForm.value.address,
      photo: this.newOfferForm.value.image,
    };

    this.offersService.uploadPhoto(this.image).subscribe(
      (resData: CloudinaryResponse) => {
        sendingForm.photo = resData.data.secure_url;
        this.offersService.createNewOffer(sendingForm).subscribe(
          (resData) => {
            console.log(resData);
            this.messagesService.setMessage(
              'success',
              'Success',
              'Offer has been added!'
            );
            this.router.navigate(['/my-offers']);
          },
          () => {
            this.messagesService.setMessage(
              'error',
              'Error',
              'Something went wrong!'
            );
          }
        );
      },
      () => {
        this.messagesService.setMessage(
          'error',
          'Error',
          'Something went wrong!'
        );
      }
    );
  }
}
