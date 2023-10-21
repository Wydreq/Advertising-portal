import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Message } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
  providers: [MessageService],
})
export class AuthComponent implements OnInit {
  isLogin: boolean = true;
  isReset: boolean = false;
  isLoading: boolean = false;
  messages: Message[] = [];

  constructor(
    private authService: AuthService,
    private messagesService: MessagesService
  ) {}

  ngOnInit(): void {
    this.messagesService.messages$.subscribe((messages) => {
      this.messages = messages;
    });
  }

  onSubmit(form: NgForm) {
    let authObs: Observable<{}>;
    this.isLoading = true;
    authObs = this.authService.login(form.value.email, form.value.password);
    authObs.subscribe(
      (resData) => {
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.messagesService.setMessage('error', 'Error', error);
      }
    );
  }

  registerSuccess() {
    this.messagesService.setMessage(
      'success',
      'Success',
      'Account has been created!'
    );
  }

  resetSuccess() {
    this.messagesService.setMessage(
      'success',
      'Success',
      'Email with reset link has been sent!'
    );
  }
}
