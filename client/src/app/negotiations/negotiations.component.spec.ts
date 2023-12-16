import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NegotiationsComponent } from './negotiations.component';

describe('NegotiationsComponent', () => {
  let component: NegotiationsComponent;
  let fixture: ComponentFixture<NegotiationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NegotiationsComponent]
    });
    fixture = TestBed.createComponent(NegotiationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
