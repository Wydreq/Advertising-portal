import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [MessageService],
})
export class AuthComponent {
  isLogin: boolean = true;
  isReset: boolean = false;
  isLoading: boolean = false;
  messages: Message[] = [];

  constructor(private authService: AuthService) {}

  onSubmit(form: NgForm) {
    let authObs: Observable<{}>;
    this.isLoading = true;
    authObs = this.authService.login(form.value.email, form.value.password);
    authObs.subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.messages = [];
      },
      (error) => {
        this.isLoading = false;
        this.messages = [
          { severity: 'error', summary: 'Error', detail: error },
        ];
      }
    );
  }

  registerSuccess() {
    this.messages = [
      {
        severity: 'success',
        summary: 'Success',
        detail: 'Account has been created! Log in',
      },
    ];
  }

  resetSuccess() {
    this.messages = [
      {
        severity: 'success',
        summary: 'Success',
        detail: 'Email with reset link has been sent!',
      },
    ];
  }
}
