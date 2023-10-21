import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.component.html',
  styleUrls: ['./new-offer.component.css'],
})
export class NewOfferComponent implements OnInit {
  newOfferForm!: FormGroup;

  ngOnInit(): void {
    this.newOfferForm = new FormGroup({});
  }
}
