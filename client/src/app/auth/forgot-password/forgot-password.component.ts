import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  isLoading: boolean = false;
  messages: Message[] = [];

  onSubmit(form: NgForm) {
    this.isLoading = true;
    let authObs: Observable<{}>;
    const token = this.route.snapshot.params['token'];
    if (form.value.password !== form.value.confirmpassword) {
      this.messages = [
        {
          severity: 'error',
          summary: 'Error',
          detail: 'Passwords are not the same!',
        },
      ];
      this.isLoading = false;
      return;
    }
    authObs = this.authService.resetPassword(
      form.value.password,
      form.value.confirmpassword,
      token
    );
    authObs.subscribe(
      (resData) => {
        this.isLoading = false;
        this.messages = [
          {
            severity: 'success',
            summary: 'Success',
            detail: 'Password has been changed!',
          },
        ];
      },
      (error) => {
        this.isLoading = false;
        this.messages = [
          { severity: 'error', summary: 'Error', detail: error },
        ];
      }
    );
  }
}
