import { Component, OnInit } from '@angular/core';
import { PurchasesService } from 'src/app/services/purchases.service';

@Component({
  selector: 'app-sold-transaction',
  templateUrl: './sold-transaction.component.html',
  styleUrls: ['./sold-transaction.component.css'],
})
export class SoldTransactionComponent implements OnInit {
  soldItems: any;

  constructor(private purchasesService: PurchasesService) {}

  ngOnInit(): void {
    this.fetchSoldItems();
  }

  fetchSoldItems() {
    this.purchasesService.getUserSoldItems().subscribe((res: any) => {
      this.soldItems = res.data;
      console.log(res.data);
    });
  }

  confirmItemOnDelivery(id: string) {
    if (window.confirm('Are u sure that item has been sent?')) {
      this.purchasesService.setItemOnDelivery(id).subscribe(() => {
        this.fetchSoldItems();
      });
    }
  }
}
