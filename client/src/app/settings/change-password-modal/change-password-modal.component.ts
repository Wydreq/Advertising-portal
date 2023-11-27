import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/services/messages.service';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.css'],
})
export class ChangePasswordModalComponent {
  form!: FormGroup;

  @Output() close = new EventEmitter<void>();

  constructor(
    private settingsService: SettingsService,
    private messagesService: MessagesService
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      oldPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  changePasswordHandler() {
    this.settingsService
      .changePassword(
        this.form.value.oldPassword,
        this.form.value.password,
        this.form.value.confirmPassword
      )
      .subscribe(
        (resData) => {
          this.messagesService.setMessage(
            'success',
            'Success',
            'Password has been changed!'
          );
          this.close.emit();
        },
        (err) => {
          this.messagesService.setMessage(
            'error',
            'Error',
            'Something went wrong!'
          );
        }
      );
  }
}
