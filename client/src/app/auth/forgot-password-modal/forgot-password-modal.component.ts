import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { Message } from 'primeng/api';
import { MessagesService } from 'src/app/services/messages.service';

@Component({
  selector: 'app-forgot-password-modal',
  templateUrl: './forgot-password-modal.component.html',
  styleUrls: ['./forgot-password-modal.component.css'],
})
export class ForgotPasswordModalComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private messagesService: MessagesService
  ) {}

  @Output() close = new EventEmitter<void>();
  @Output() resetSuccess = new EventEmitter<void>();
  messages: Message[] = [];

  ngOnInit(): void {
    this.messagesService.messages$.subscribe((messages) => {
      this.messages = messages;
    });
  }

  onSubmit(form: NgForm) {
    let authObs: Observable<{}>;
    authObs = this.authService.forgotPassword(form.value.email);
    authObs.subscribe(
      (resData) => {
        this.resetSuccess.emit();
        this.close.emit();
      },
      (error) => {
        this.messagesService.setMessage('error', 'Error', error);
      }
    );
  }

  onClose() {
    this.close.emit();
  }
}
