import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CreditsService } from 'src/app/services/credits.service';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-successfull-page',
  templateUrl: './successfull-page.component.html',
  styleUrls: ['./successfull-page.component.css'],
})
export class SuccessfullPageComponent implements OnInit, OnDestroy {
  countdown: number = 5;
  interval: any;

  constructor(
    private route: ActivatedRoute,
    private paymentService: PaymentService,
    private creditsService: CreditsService,
    private router: Router
  ) {}

  sessionId!: string | null;

  ngOnInit(): void {
    this.sessionId = this.route.snapshot.paramMap.get('sessionId');
    this.recieveSessionData();
    this.redirectCountdown();
  }

  recieveSessionData() {
    this.paymentService.recievePayment(this.sessionId).subscribe((resData) => {
      this.creditsService.refreshCredits();
    });
  }

  redirectCountdown() {
    this.interval = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        this.router.navigate(['/']);
      }
    }, 1000);
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
