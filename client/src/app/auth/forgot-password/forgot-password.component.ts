import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Message } from 'primeng/api';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private messagesService: MessagesService
  ) {}

  isLoading: boolean = false;
  messages: Message[] = [];

  ngOnInit(): void {
    this.messagesService.messages$.subscribe((messages) => {
      this.messages = messages;
    });
  }

  onSubmit(form: NgForm) {
    this.isLoading = true;
    let authObs: Observable<{}>;
    const token = this.route.snapshot.params['token'];
    if (form.value.password !== form.value.confirmpassword) {
      this.messagesService.setMessage(
        'error',
        'Error',
        'Passwords are not the same'
      );
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
        this.messagesService.setMessage(
          'success',
          'Success',
          'Password has been changed'
        );
      },
      (error) => {
        this.isLoading = false;
        this.messagesService.setMessage('error', 'Error', error);
      }
    );
  }
}
