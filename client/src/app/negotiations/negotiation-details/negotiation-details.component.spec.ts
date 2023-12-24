import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NegotiationDetailsComponent } from './negotiation-details.component';

describe('NegotiationDetailsComponent', () => {
  let component: NegotiationDetailsComponent;
  let fixture: ComponentFixture<NegotiationDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NegotiationDetailsComponent]
    });
    fixture = TestBed.createComponent(NegotiationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
