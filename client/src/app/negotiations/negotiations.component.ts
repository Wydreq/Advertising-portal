import { Component, OnInit } from '@angular/core';
import { NegotiateService } from '../services/negotiate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-negotiations',
  templateUrl: './negotiations.component.html',
  styleUrls: ['./negotiations.component.css'],
})
export class NegotiationsComponent implements OnInit {
  userNegotiations: any;

  constructor(
    private negotiateService: NegotiateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.negotiateService
      .getAllBuyerNegotiations()
      .subscribe((negotiations: any) => {
        this.userNegotiations = negotiations.data;
        console.log(negotiations);
      });
  }

  showNegotiation(id: string) {
    console.log(id);
    this.router.navigate(['/negotiations', id]);
  }
}
