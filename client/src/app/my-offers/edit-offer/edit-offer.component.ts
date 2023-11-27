import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OffersService } from 'src/app/services/offers.service';
import { Observable } from 'rxjs';
import { Message } from 'primeng/api';
import { MessagesService } from 'src/app/services/messages.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferItem, OffersRes } from 'src/app/shared/models/offers.model';

interface Category {
  name: string;
  code: string;
}

@Component({
  selector: 'app-edit-offer',
  templateUrl: './edit-offer.component.html',
  styleUrls: ['./edit-offer.component.css'],
})
export class EditOfferComponent {
  newOfferForm!: FormGroup;
  categories: Category[] | undefined;
  messages: Message[] = [];
  photoUrl: string = '';

  constructor(
    private offersService: OffersService,
    private messagesService: MessagesService,
    private router: Router,
    private route: ActivatedRoute
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
      category: new FormControl(null, Validators.required),
      description: new FormControl(null, [
        Validators.required,
        Validators.maxLength(1500),
      ]),
      price: new FormControl(null, [
        Validators.required,
        Validators.maxLength(5),
      ]),
      negotiate: new FormControl(null, Validators.required),
      phone: new FormControl(null, [
        Validators.required,
        Validators.maxLength(20),
      ]),
      image: new FormControl(null),
    });

    let id = this.route.snapshot.paramMap.get('id');

    this.offersService.getSingleOffer(id).subscribe((offerRes) => {
      console.log(offerRes);
      this.newOfferForm.patchValue({
        name: offerRes.data.name,
        category: offerRes.data.category,
        description: offerRes.data.description,
        price: offerRes.data.price,
        negotiate: offerRes.data.negotiate,
        phone: offerRes.data.phone,
        image: offerRes.data.phone,
      });
    });
  }

  onFileSelect(event: any) {
    const file = event.target.files[0];
    this.newOfferForm.patchValue({
      image: file,
    });
  }

  onSubmitForm() {
    const sendingForm = {
      name: this.newOfferForm.value.name,
      category: this.newOfferForm.value.category.name,
      description: this.newOfferForm.value.description,
      price: this.newOfferForm.value.price,
      negotiate: this.newOfferForm.value.negotiate,
      phone: this.newOfferForm.value.phone,
    };

    const formData = new FormData();
    formData.append('image', this.newOfferForm.value.image);

    let offerObs: Observable<{}>;
    let id = this.route.snapshot.paramMap.get('id');
    offerObs = this.offersService.editOffer(sendingForm, formData, id);
    offerObs.subscribe(
      (resData) => {
        this.messagesService.setMessage(
          'success',
          'Success',
          'Offer has been edited!'
        );
        this.router.navigate(['/my-offers']);
      },
      (error) => {
        this.messagesService.setMessage(
          'error',
          'Error',
          'Something went wrong!'
        );
      }
    );
  }
}
