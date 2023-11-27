import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-reset-email',
  templateUrl: './reset-email.component.html',
  styleUrls: ['./reset-email.component.css'],
})
export class ResetEmailComponent implements OnInit {
  isSuccess = false;
  isLoading = true;
  message: string = '';
  counter = 5;

  constructor(
    private settingsService: SettingsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    const token = this.route.snapshot.params['token'];
    this.settingsService.resetEmailAddress(token).subscribe(
      () => {
        this.isSuccess = true;
        this.isLoading = false;
      },
      (err) => {
        this.isSuccess = false;
        this.message = err.error.error;
        this.isLoading = false;
      }
    );

    setInterval(() => {
      this.counter--;
      if (this.counter === 0) {
        this.router.navigate(['/']);
      }
    }, 1000);
  }
}
