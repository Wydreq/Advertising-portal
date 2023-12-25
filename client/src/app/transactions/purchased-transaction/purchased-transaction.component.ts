import { Component } from '@angular/core';
import { PurchasesService } from 'src/app/services/purchases.service';

@Component({
  selector: 'app-purchased-transaction',
  templateUrl: './purchased-transaction.component.html',
  styleUrls: ['./purchased-transaction.component.css'],
})
export class PurchasedTransactionComponent {
  purchasedItems: any;

  constructor(private purchasesService: PurchasesService) {}

  ngOnInit(): void {
    this.fetchPurchasedItems();
  }

  fetchPurchasedItems() {
    this.purchasesService.getUserPurchasedItems().subscribe((res: any) => {
      this.purchasedItems = res.data;
      console.log(res.data);
    });
  }

  setItemDelivered(id: string) {
    if (window.confirm('Are u sure that you recieved item?')) {
      this.purchasesService.setItemDelivered(id).subscribe(() => {
        this.fetchPurchasedItems();
      });
    }
  }
}
