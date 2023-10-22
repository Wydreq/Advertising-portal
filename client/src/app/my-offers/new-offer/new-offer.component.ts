import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OffersService } from 'src/app/services/offers.service';
import { Observable } from 'rxjs';
import { Message } from 'primeng/api';
import { MessagesService } from 'src/app/services/messages.service';

interface Category {
  name: string;
  code: string;
}

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.component.html',
  styleUrls: ['./new-offer.component.css'],
})
export class NewOfferComponent implements OnInit {
  newOfferForm!: FormGroup;
  categories: Category[] | undefined;
  isLoading: boolean = false;
  messages: Message[] = [];
  photoUrl: string = '';

  constructor(
    private offersService: OffersService,
    private messagesService: MessagesService
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
        Validators.maxLength(500),
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
      photo: new FormControl(null),
    });
  }

  onFileSelect(event: any) {
    // if (event.target.files.length > 0) {
    //   const file = event.target.files[0];
    //   const formData = new FormData();
    //   formData.append('photo', file, file.name);
    //   let offerObs: Observable<{}>;
    //   offerObs = this.offersService.uploadPhoto(formData);
    //   offerObs.subscribe(
    //     (resData) => {
    //       console.log(resData);
    //     },
    //     (err) => {
    //       console.log(err);
    //     }
    //   );
    // }
  }

  onSubmitForm() {
    const sendingForm = {
      name: this.newOfferForm.value.name,
      category: this.newOfferForm.value.category.name,
      description: this.newOfferForm.value.description,
      price: this.newOfferForm.value.price,
      negotiate: this.newOfferForm.value.negotiate,
      phone: this.newOfferForm.value.phone,
      address: this.newOfferForm.value.address,
      photo: 'no-photo.jpg',
    };
    let offerObs: Observable<{}>;
    this.isLoading = true;
    offerObs = this.offersService.createNewOffer(sendingForm);
    offerObs.subscribe(
      (resData) => {
        this.isLoading = false;
        this.messagesService.setMessage(
          'success',
          'Success',
          'Offer has been added!'
        );
      },
      (error) => {
        this.isLoading = false;
        this.messagesService.setMessage(
          'error',
          'Error',
          'Something went wrong!'
        );
      }
    );
  }
}
