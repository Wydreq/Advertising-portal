import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OffersService } from 'src/app/services/offers.service';
import { Observable } from 'rxjs';
import { Message } from 'primeng/api';
import { MessagesService } from 'src/app/services/messages.service';
import { ActivatedRoute, Router } from '@angular/router';
import { OfferItem, OffersRes } from 'src/app/models/offers.model';

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
  isLoading: boolean = true;
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
        Validators.maxLength(500),
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
      address: new FormControl(null, Validators.required),
      image: new FormControl(null),
    });

    let id = this.route.snapshot.paramMap.get('id');
    this.offersService.isLoading.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
    this.offersService.getSingleOffer(id).subscribe((offerRes) => {
      this.isLoading = true;
      this.newOfferForm.patchValue({
        name: offerRes.data.name,
        category: offerRes.data.category,
        description: offerRes.data.description,
        price: offerRes.data.price,
        negotiate: offerRes.data.negotiate,
        phone: offerRes.data.phone,
        address: null,
        image: offerRes.data.phone,
      });
      this.isLoading = false;
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
      address: this.newOfferForm.value.address,
    };

    const formData = new FormData();
    formData.append('image', this.newOfferForm.value.image);

    let offerObs: Observable<{}>;
    this.isLoading = true;
    let id = this.route.snapshot.paramMap.get('id');
    offerObs = this.offersService.editOffer(sendingForm, formData, id);
    offerObs.subscribe(
      (resData) => {
        this.isLoading = false;
        this.messagesService.setMessage(
          'success',
          'Success',
          'Offer has been edited!'
        );
        this.router.navigate(['/my-offers']);
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
