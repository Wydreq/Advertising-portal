import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private settingsService: SettingsService) {}

  @Input() offer!: OfferItem;

  ngOnInit(): void {
    this.settingsService.getUserAddresses();
    this.settingsService.userAddresses.subscribe((addresses) => {
      this.userAddresses = addresses;
    });
  }

  setDeliveryAddress(address: IAddress) {
    this.pickedDeliveryAddress = address;
  }
}
