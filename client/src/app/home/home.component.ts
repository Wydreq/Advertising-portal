import { Component, OnInit } from '@angular/core';
import { Message, MessageService } from 'primeng/api';
import { OffersService } from '../services/offers.service';
import { OfferItem, OffersRes } from '../models/offers.model';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [MessageService],
})
export class HomeComponent implements OnInit {
  loadedOffers: OfferItem[] | null = [];
  messages: Message[] = [];
  isLoading: boolean = true;

  constructor(
    private offersService: OffersService,
    private messagesService: MessagesService
  ) {}

  ngOnInit() {
    this.messagesService.messages$.subscribe((messages) => {
      this.messages = messages;
    });
    this.offersService.isLoading.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
    this.offersService.offers.subscribe((offers) => {
      this.loadedOffers = offers.data;
    });
    if (this.loadedOffers!.length === 0) {
      this.offersService.getAllOffers();
    }
  }

  customSearchHandler(options: Object) {
    this.offersService.getFilteredOffers(options);
  }
}
