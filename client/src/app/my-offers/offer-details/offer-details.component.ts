import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Message } from 'primeng/api';
import { OfferItem } from 'src/app/models/offers.model';
import { MessagesService } from 'src/app/services/messages.service';
import { OffersService } from 'src/app/services/offers.service';

export interface OfferRes {
  success: boolean;
  data: OfferItem;
}

@Component({
  selector: 'app-offer-details',
  templateUrl: './offer-details.component.html',
  styleUrls: ['./offer-details.component.css'],
})
export class OfferDetailsComponent implements OnInit {
  offer!: OfferItem;
  isLoading: boolean = true;
  messages: Message[] = [];

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
        this.isLoading = false;
      },
      (err) => {
        this.messagesService.setMessage(
          'error',
          'Error',
          'Something went wrong!'
        );
        this.isLoading = false;
      }
    );
  }
}
