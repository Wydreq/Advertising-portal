import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Message } from 'primeng/api';
import { MessagesService } from 'src/app/services/messages.service';
import { NegotiateService } from 'src/app/services/negotiate.service';
import { OfferItem } from 'src/app/shared/models/offers.model';

@Component({
  selector: 'app-negotiate-start-modal',
  templateUrl: './negotiate-start-modal.component.html',
  styleUrls: ['./negotiate-start-modal.component.css'],
})
export class NegotiateStartModalComponent {
  negotiateStartForm!: FormGroup;
  messages: Message[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private negotiateService: NegotiateService,
    private messagesService: MessagesService
  ) {}

  @Input() offer!: OfferItem;

  ngOnInit(): void {
    this.messagesService.messages$.subscribe((messages) => {
      this.messages = messages;
    });
    this.negotiateStartForm = this.formBuilder.group({
      maxPrice: [null, Validators.required],
    });
  }

  onSubmit() {
    this.negotiateService
      .startNegotiate(this.offer._id, this.negotiateStartForm.value.maxPrice)
      .subscribe(
        (res) => {
          this.messagesService.setMessage(
            'success',
            'Success',
            'Negotitation created'
          );
        },
        (err) => {
          this.messagesService.setMessage('error', 'Error', err.error.error);
        }
      );
  }
}
