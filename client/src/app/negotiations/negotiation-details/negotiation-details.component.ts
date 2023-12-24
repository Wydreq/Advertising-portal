import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NegotiateService } from 'src/app/services/negotiate.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-negotiation-details',
  templateUrl: './negotiation-details.component.html',
  styleUrls: ['./negotiation-details.component.css'],
})
export class NegotiationDetailsComponent implements OnInit, OnDestroy {
  negotiation: any;
  userId: any;
  form!: FormGroup;
  interval: any;
  errorMessage: string = '';

  constructor(
    private negotiateService: NegotiateService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.authService.user.subscribe((user: User | null) => {
      this.userId = user!.id;
    });
    this.initializeForm();
    this.loadNegotiationData();

    this.interval = setInterval(() => {
      this.refreshBids();
    }, 10000);
  }

  refreshBids() {
    const id = this.route.snapshot.paramMap.get('id');
    this.negotiateService.getNegotiationBids(id).subscribe((bids: any) => {
      this.negotiation.bids = bids.data;
    });
  }

  initializeForm() {
    this.form = this.fb.group({
      price: [{ value: null, disabled: false }, Validators.required],
    });
  }

  loadNegotiationData() {
    const id = this.route.snapshot.paramMap.get('id');
    this.negotiateService.getNegotiation(id).subscribe((negotiation: any) => {
      this.negotiation = negotiation.data;
    });
  }

  bidPrice() {
    const id = this.route.snapshot.paramMap.get('id');
    this.negotiateService.bidPrice(id, this.form.value.price).subscribe(
      () => {
        this.refreshBids();
        this.form.reset();
        this.errorMessage = '';
      },
      (error) => {
        this.errorMessage = error.error.error;
      }
    );
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
