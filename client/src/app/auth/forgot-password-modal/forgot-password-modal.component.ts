import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Observable } from 'rxjs';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  styleUrls: ['./forgot-password-modal.component.css'],
})
export class ForgotPasswordModalComponent {
  constructor(private authService: AuthService) {}

  @Output() close = new EventEmitter<void>();
  @Output() resetSuccess = new EventEmitter<void>();
  isLoading: boolean = false;
  messages: Message[] = [];

  onSubmit(form: NgForm) {
    let authObs: Observable<{}>;
    this.isLoading = true;
    authObs = this.authService.forgotPassword(form.value.email);
    authObs.subscribe(
      (resData) => {
        this.isLoading = false;
        this.messages = [];
        this.resetSuccess.emit();
        this.close.emit();
      },
      (error) => {
        this.isLoading = false;
        this.messages = [
          { severity: 'error', summary: 'Error', detail: error },
        ];
      }
    );
  }

  onClose() {
    this.close.emit();
  }
}
