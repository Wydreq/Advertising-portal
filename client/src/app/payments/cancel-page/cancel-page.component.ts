import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancel-page',
  templateUrl: './cancel-page.component.html',
  styleUrls: ['./cancel-page.component.css'],
})
export class CancelPageComponent implements OnInit, OnDestroy {
  countdown: number = 5;
  interval: any;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.redirectCountdown();
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
