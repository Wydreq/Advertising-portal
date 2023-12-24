import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NegotiateService } from 'src/app/services/negotiate.service';

@Component({
  selector: 'app-offer-negotiations',
  templateUrl: './offer-negotiations.component.html',
  styleUrls: ['./offer-negotiations.component.css'],
})
export class OfferNegotiationsComponent implements OnInit {
  negotiations: any;

  constructor(
    private negotiateService: NegotiateService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('offerId');
    this.negotiateService
      .getOfferNegotiations(id)
      .subscribe((negotiations: any) => {
        this.negotiations = negotiations.data;
        console.log(negotiations);
      });
  }

  showNegotiation(id: string) {
    this.router.navigate(['/negotiations', id]);
  }
}
