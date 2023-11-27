import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { MessagesService } from 'src/app/services/messages.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-change-email-modal',
  templateUrl: './change-email-modal.component.html',
  styleUrls: ['./change-email-modal.component.css'],
})
export class ChangeEmailModalComponent {
  form!: FormGroup;
  messages: Message[] = [];

  @Output() close = new EventEmitter<void>();

  constructor(
    private settingsSerivice: SettingsService,
    private messagesService: MessagesService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  changeEmailHandler() {
    this.settingsSerivice.changeEmailAddress(this.form.value.email).subscribe(
      (resData) => {
        this.messagesService.setMessage(
          'success',
          'Success',
          'Email has been sent!'
        );
        this.close.emit();
      },
      (err) => {
        this.messagesService.setMessage('error', 'Error', err.error.error);
        this.close.emit();
      }
    );
  }
}
