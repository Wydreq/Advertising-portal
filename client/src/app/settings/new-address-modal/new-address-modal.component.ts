import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/services/messages.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-new-address-modal',
  templateUrl: './new-address-modal.component.html',
  styleUrls: ['./new-address-modal.component.css'],
})
export class NewAddressModalComponent implements OnInit {
  form!: FormGroup;

  @Output() close = new EventEmitter<void>();

  constructor(
    private settingsService: SettingsService,
    private messagesService: MessagesService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      street: new FormControl(null, Validators.required),
      houseNumber: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      postalCode: new FormControl(null, Validators.required),
      recieverFullName: new FormControl(null, Validators.required),
    });
  }

  addNewAddressHandler() {
    this.settingsService
      .addNewAddress(
        this.form.value.street,
        this.form.value.houseNumber,
        this.form.value.city,
        this.form.value.country,
        this.form.value.postalCode,
        this.form.value.recieverFullName
      )
      .subscribe(
        (resData) => {
          console.log(resData);
          this.settingsService.getUserAddresses();
          this.messagesService.setMessage(
            'success',
            'Success',
            'Address has been added!'
          );
          this.close.emit();
        },
        (err) => {
          this.messagesService.setMessage('error', 'Error', err);
        }
      );
  }
}
