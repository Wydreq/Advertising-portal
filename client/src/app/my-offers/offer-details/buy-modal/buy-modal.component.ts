import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { CreditsService } from 'src/app/services/credits.service';
import { MessagesService } from 'src/app/services/messages.service';
import { PurchasesService } from 'src/app/services/purchases.service';
import { SettingsService } from 'src/app/services/settings.service';
import { OfferItem } from 'src/app/shared/models/offers.model';
import { IAddress } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-buy-modal',
  templateUrl: './buy-modal.component.html',
  styleUrls: ['./buy-modal.component.css'],
})
export class BuyModalComponent implements OnInit {
  userAddresses!: IAddress[];
  pickedDeliveryAddress!: IAddress;
  messages: Message[] = [];

  constructor(
    private settingsService: SettingsService,
    private router: Router,
    private messagesService: MessagesService,
    private purchasesService: PurchasesService,
    private creditsService: CreditsService
  ) {}

  @Input() offer!: OfferItem;

  ngOnInit(): void {
    this.settingsService.getUserAddresses();
    this.settingsService.userAddresses.subscribe((addresses) => {
      this.userAddresses = addresses;
    });
    this.messagesService.messages$.subscribe((messages) => {
      this.messages = messages;
    });
  }

  setDeliveryAddress(address: IAddress) {
    this.pickedDeliveryAddress = address;
  }

  redirectToSettings() {
    this.router.navigate(['/settings']);
  }

  purchaseItem() {
    this.purchasesService
      .purchaseItem(this.offer._id, this.pickedDeliveryAddress._id)
      .subscribe(
        () => {
          this.creditsService.refreshCredits();
          this.router.navigate(['/transactions/purchased']);
        },
        (err) => {
          this.messagesService.setMessage('error', 'Error', err.error.error);
        }
      );
  }
}
