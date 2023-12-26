import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Message } from 'primeng/api';
import { MessagesService } from 'src/app/services/messages.service';
import { NegotiateService } from 'src/app/services/negotiate.service';
import { SettingsService } from 'src/app/services/settings.service';
import { OfferItem } from 'src/app/shared/models/offers.model';
import { IAddress } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-negotiate-start-modal',
  templateUrl: './negotiate-start-modal.component.html',
  styleUrls: ['./negotiate-start-modal.component.css'],
})
export class NegotiateStartModalComponent {
  negotiateStartForm!: FormGroup;
  messages: Message[] = [];
  userAddresses!: IAddress[];
  pickedDeliveryAddress!: IAddress;

  constructor(
    private formBuilder: FormBuilder,
    private negotiateService: NegotiateService,
    private messagesService: MessagesService,
    private settingsService: SettingsService,
    private router: Router
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
    this.negotiateStartForm = this.formBuilder.group({
      maxPrice: [null, Validators.required],
    });
  }

  setDeliveryAddress(address: IAddress) {
    this.pickedDeliveryAddress = address;
  }

  redirectToSettings() {
    this.router.navigate(['/settings']);
  }

  onSubmit() {
    this.negotiateService
      .startNegotiate(
        this.offer._id,
        this.negotiateStartForm.value.maxPrice,
        this.pickedDeliveryAddress._id
      )
      .subscribe(
        (res: any) => {
          this.messagesService.setMessage(
            'success',
            'Success',
            'Negotitation created'
          );
          this.router.navigate(['/negotiations', res.data._id]);
        },
        (err) => {
          this.messagesService.setMessage('error', 'Error', err.error.error);
        }
      );
  }
}
