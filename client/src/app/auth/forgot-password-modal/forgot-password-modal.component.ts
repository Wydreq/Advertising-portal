import {Component, EventEmitter, Output} from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  styleUrls: ['./forgot-password-modal.component.css']
})
export class ForgotPasswordModalComponent {

  constructor(private authService: AuthService) {}

  @Output() close = new EventEmitter<void>();
  isLoading: boolean = false;
  errorMessage: string = '';
  successMessage: string = '';

  onSubmit(form: NgForm) {
    let authObs: Observable<{}>;
    this.isLoading = true;
    authObs = this.authService.forgotPassword(form.value.email);
    authObs.subscribe(
      resData => {
        this.isLoading = false;
        this.errorMessage = '';
        this.successMessage = 'Mail with reset link has been sent!';
      },
      error => {
        this.isLoading = false;
        this.successMessage = '';
        this.errorMessage = error;
      }
    )
  }

  onClose() {
    this.close.emit();
  }
}
