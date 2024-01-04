import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AuthService } from '../services/auth.service';
import { PaymentService } from '../services/payment.service';
import { CreditsService } from '../services/credits.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let paymentServiceSpy: jasmine.SpyObj<PaymentService>;
  let creditsServiceSpy: jasmine.SpyObj<CreditsService>;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    const authSpy = jasmine.createSpyObj('AuthService', ['user', 'logout']);
    const paymentSpy = jasmine.createSpyObj('PaymentService', ['startPayment']);
    const creditsSpy = jasmine.createSpyObj('CreditsService', [
      'refreshCredits',
    ]);
    const messageSpy = jasmine.createSpyObj('MessageService', ['clear', 'add']);

    TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      providers: [
        { provide: AuthService, useValue: authSpy },
        { provide: PaymentService, useValue: paymentSpy },
        { provide: CreditsService, useValue: creditsSpy },
        { provide: MessageService, useValue: messageSpy },
      ],
      imports: [ToastModule],
    });

    authServiceSpy = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    paymentServiceSpy = TestBed.inject(
      PaymentService
    ) as jasmine.SpyObj<PaymentService>;
    creditsServiceSpy = TestBed.inject(
      CreditsService
    ) as jasmine.SpyObj<CreditsService>;
    messageServiceSpy = TestBed.inject(
      MessageService
    ) as jasmine.SpyObj<MessageService>;

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with default values', () => {
    expect(component.isAuthenticated).toBeFalsy();
    expect(component.firstName).toBeFalsy();
    expect(component.lastName).toBeFalsy();
    expect(component.role).toBeFalsy();
    expect(component.credits).toBe(0);
    expect(component.items).toBeFalsy();
    expect(component.menuChanged).toBeTruthy();
  });

  it('should call authService.logout on onLogout', () => {
    component.onLogout();

    expect(authServiceSpy.logout).toHaveBeenCalled();
  });

  it('should call paymentService.startPayment on paymentHandler', () => {
    component.paymentHandler();

    expect(paymentServiceSpy.startPayment).toHaveBeenCalled();
  });
});
