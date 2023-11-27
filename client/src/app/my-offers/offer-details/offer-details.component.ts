import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'primeng/api';
import { OfferItem } from 'src/app/shared/models/offers.model';
import { MessagesService } from 'src/app/services/messages.service';
import { OffersService } from 'src/app/services/offers.service';

export interface OfferRes {
  success: boolean;
  data: OfferItem;
  user: {
    name: string;
    createdAt: Date;
  };
}

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css'],
})
export class OfferDetailsComponent implements OnInit {
  offer!: OfferItem;
  messages: Message[] = [];
  isNumberShowed: boolean = false;
  seller: any;
  isModalShowed = false;
  modalMode = 'buy';

  constructor(
    private offersService: OffersService,
    private route: ActivatedRoute,
    private messagesService: MessagesService
  ) {}
  ngOnInit() {
    this.messagesService.messages$.subscribe((messages) => {
      this.messages = messages;
    });
    const id = this.route.snapshot.paramMap.get('id');
    this.offersService.getSingleOffer(id).subscribe(
      (resData) => {
        this.offer = resData.data;
        this.seller = resData.user;
      },
      (err) => {
        this.messagesService.setMessage(
          'error',
          'Error',
          'Something went wrong!'
        );
      }
    );
    this.offersService.addOfferView(id);
  }

  openModal(mode: string) {
    this.modalMode = mode;
    this.isModalShowed = true;
  }

  closeModal() {
    this.isModalShowed = false;
  }

  showOfferNumber() {
    const id = this.route.snapshot.paramMap.get('id');
    this.offersService.addPhoneNumberView(id);
    this.isNumberShowed = true;
  }
}
