import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { SettingsService } from './settings.service';

describe('SettingsService', () => {
  let service: SettingsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SettingsService],
    });

    service = TestBed.inject(SettingsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get logged user info', inject(
    [HttpTestingController, SettingsService],
    (httpClient: HttpTestingController, settingsService: SettingsService) => {
      settingsService.getLoggedUserInfo().subscribe((response: any) => {
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne('http://localhost:5000/api/v1/auth/me');
      expect(req.request.method).toBe('GET');
      req.flush({});
    }
  ));

  it('should get user addresses', inject(
    [HttpTestingController, SettingsService],
    (httpClient: HttpTestingController, settingsService: SettingsService) => {
      settingsService.getUserAddresses();

      const req = httpMock.expectOne(
        'http://localhost:5000/api/v1/address/get-user-addresses'
      );
      expect(req.request.method).toBe('GET');
      req.flush({});
    }
  ));

  it('should change email address', inject(
    [HttpTestingController, SettingsService],
    (httpClient: HttpTestingController, settingsService: SettingsService) => {
      const newEmail = 'new.email@example.com';

      settingsService
        .changeEmailAddress(newEmail)
        .subscribe((response: any) => {
          expect(response).toBeTruthy();
        });

      const req = httpMock.expectOne(
        'http://localhost:5000/api/v1/auth/change-email'
      );
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ email: newEmail });
      req.flush({});
    }
  ));

  it('should delete address', inject(
    [HttpTestingController, SettingsService],
    (httpClient: HttpTestingController, settingsService: SettingsService) => {
      const addressId = '1';

      settingsService.deleteAddress(addressId).subscribe((response: any) => {
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne(
        `http://localhost:5000/api/v1/address/${addressId}`
      );
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    }
  ));

  it('should change password', inject(
    [HttpTestingController, SettingsService],
    (httpClient: HttpTestingController, settingsService: SettingsService) => {
      const oldPassword = 'oldPassword';
      const newPassword = 'newPassword';

      settingsService
        .changePassword(oldPassword, newPassword, newPassword)
        .subscribe((response: any) => {
          expect(response).toBeTruthy();
        });

      const req = httpMock.expectOne(
        'http://localhost:5000/api/v1/auth/change-password'
      );
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({
        oldPassword,
        password: newPassword,
        confirmPassword: newPassword,
      });
      req.flush({});
    }
  ));
});
