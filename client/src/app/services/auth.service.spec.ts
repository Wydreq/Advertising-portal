import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService, AuthResponseData } from './auth.service';
import { User } from '../shared/models/user.model';
import { BehaviorSubject } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let routerSpy: jasmine.SpyObj<Router>;
  let messageServiceSpy: jasmine.SpyObj<MessageService>;

  beforeEach(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    messageServiceSpy = jasmine.createSpyObj('MessageService', ['add']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: Router, useValue: routerSpy },
        { provide: MessageService, useValue: messageServiceSpy },
      ],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle signup', inject(
    [HttpTestingController, AuthService],
    (httpClient: HttpTestingController, authService: AuthService) => {
      const signUpData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password',
        dateOfBirth: new Date(),
        gender: 'male',
      };

      authService
        .signup(
          signUpData.firstName,
          signUpData.lastName,
          signUpData.email,
          signUpData.password,
          signUpData.dateOfBirth,
          signUpData.gender
        )
        .subscribe((response: AuthResponseData) => {
          expect(response).toBeTruthy();
        });

      const req = httpMock.expectOne(
        'http://localhost:5000/api/v1/auth/register'
      );
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(signUpData);
      req.flush({
        token: 'token',
        options: { expires: '2023-01-01' },
        user: {},
      });
    }
  ));

  it('should handle login', inject(
    [HttpTestingController, AuthService],
    (httpClient: HttpTestingController, authService: AuthService) => {
      const loginData = {
        email: 'john.doe@example.com',
        password: 'password',
      };

      authService
        .login(loginData.email, loginData.password)
        .subscribe((response: AuthResponseData) => {
          expect(response).toBeTruthy();
        });

      const req = httpMock.expectOne('http://localhost:5000/api/v1/auth/login');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(loginData);
      req.flush({
        token: 'token',
        options: { expires: '2023-01-01' },
        user: {},
      });
    }
  ));

  it('should handle forgot password', inject(
    [HttpTestingController, AuthService],
    (httpClient: HttpTestingController, authService: AuthService) => {
      const email = 'john.doe@example.com';

      authService.forgotPassword(email).subscribe((response: any) => {
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne(
        'http://localhost:5000/api/v1/auth/forgotpassword'
      );
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ email: email });
      req.flush({});
    }
  ));

  it('should handle auto login', () => {
    spyOn(localStorage, 'getItem').and.returnValue(
      JSON.stringify({
        email: 'john.doe@example.com',
        id: '1',
        _token: 'token',
        expiresIn: '2023-01-01',
        firstName: 'John',
        lastName: 'Doe',
        role: 'user',
        credits: 100,
        addresses: [],
      })
    );

    service.autoLogin();

    const expectedUser = new User(
      'john.doe@example.com',
      '1',
      'token',
      '2023-01-01',
      'John',
      'Doe',
      'user',
      100,
      []
    );

    expect(service.user.getValue()).toEqual(expectedUser);
  });

  it('should handle logout', () => {
    spyOn(localStorage, 'removeItem');
    spyOn(window, 'clearTimeout');

    service.logout();

    expect(service.user.getValue()).toBeNull();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/auth']);
    expect(localStorage.removeItem).toHaveBeenCalledWith('userData');
  });

  it('should handle errors', inject(
    [HttpTestingController, AuthService],
    (httpClient: HttpTestingController, authService: AuthService) => {
      const errorResponse = {
        error: {
          error: 'Invalid credentials',
        },
      };

      authService
        .login('invalidemail@example.com', 'invalidpassword')
        .subscribe(
          () => {},
          (error) => {
            expect(error).toEqual('An unknown error occurred!');
          }
        );

      const req = httpMock.expectOne('http://localhost:5000/api/v1/auth/login');
      req.flush(errorResponse, { status: 400, statusText: 'Bad Request' });
    }
  ));
});
