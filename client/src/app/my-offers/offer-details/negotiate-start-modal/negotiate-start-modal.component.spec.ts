import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NegotiateStartModalComponent } from './negotiate-start-modal.component';

describe('NegotiateStartModalComponent', () => {
  let component: NegotiateStartModalComponent;
  let fixture: ComponentFixture<NegotiateStartModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NegotiateStartModalComponent]
    });
    fixture = TestBed.createComponent(NegotiateStartModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
