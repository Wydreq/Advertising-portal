import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoldTransactionComponent } from './sold-transaction.component';

describe('SoldTransactionComponent', () => {
  let component: SoldTransactionComponent;
  let fixture: ComponentFixture<SoldTransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoldTransactionComponent]
    });
    fixture = TestBed.createComponent(SoldTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
