import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OfferNegotiationsComponent } from './offer-negotiations.component';

describe('OfferNegotiationsComponent', () => {
  let component: OfferNegotiationsComponent;
  let fixture: ComponentFixture<OfferNegotiationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OfferNegotiationsComponent]
    });
    fixture = TestBed.createComponent(OfferNegotiationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
