import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedTransactionComponent } from './purchased-transaction.component';

describe('PurchasedTransactionComponent', () => {
  let component: PurchasedTransactionComponent;
  let fixture: ComponentFixture<PurchasedTransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchasedTransactionComponent]
    });
    fixture = TestBed.createComponent(PurchasedTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
