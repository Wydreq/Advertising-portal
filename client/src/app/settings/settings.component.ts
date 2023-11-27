import { Component, OnInit } from '@angular/core';
import { IAddress, User } from '../shared/models/user.model';
import { AuthService } from '../services/auth.service';
import { SettingsService } from '../services/settings.service';
import { MessagesService } from '../services/messages.service';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  user!: User | null;
  isModalShowed = false;
  modalMode = 'address';
  userAddresses!: IAddress[];
  messages: Message[] = [];

  constructor(
    private authService: AuthService,
    private settingsService: SettingsService,
    private messagesService: MessagesService
  ) {}

  ngOnInit(): void {
    this.settingsService.getUserAddresses();
    this.settingsService.userAddresses.subscribe((addresses) => {
      this.userAddresses = addresses;
    });
    this.authService.user.subscribe((user) => {
      this.user = user;
    });
    this.messagesService.messages$.subscribe((messages) => {
      this.messages = messages;
    });
  }

  closeModal() {
    this.isModalShowed = false;
  }
  openModal(mode: string) {
    this.isModalShowed = true;
    this.modalMode = mode;
  }

  deleteAddressHandler(addressId: string) {
    if (confirm('Are you sure to delete this address?')) {
      this.settingsService.deleteAddress(addressId).subscribe(
        (resData: any) => {
          this.settingsService.getUserAddresses();
          this.messagesService.setMessage(
            'success',
            'Success',
            resData.message
          );
        },
        (err) => {
          this.messagesService.setMessage('error', 'Error', err);
        }
      );
    }
  }
}
