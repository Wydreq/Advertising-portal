import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-change-email-modal',
  templateUrl: './change-email-modal.component.html',
  styleUrls: ['./change-email-modal.component.css'],
})
export class ChangeEmailModalComponent {
  form!: FormGroup;

  @Output() close = new EventEmitter<void>();

  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  changeEmailHandler() {}
}
