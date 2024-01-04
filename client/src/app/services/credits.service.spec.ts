import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { CreditsService } from './credits.service';

describe('CreditsService', () => {
  let service: CreditsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CreditsService],
    });

    service = TestBed.inject(CreditsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize credits', inject(
    [HttpTestingController, CreditsService],
    (httpClient: HttpTestingController, creditsService: CreditsService) => {
      creditsService.refreshCredits();

      const req = httpMock.expectOne('http://localhost:5000/api/v1/auth/me');
      expect(req.request.method).toBe('GET');
      req.flush({ data: { credits: 100 } });

      creditsService.credits.subscribe((credits: any) => {
        expect(credits).toBe(100);
      });
    }
  ));

  it('should update credits on refresh', inject(
    [HttpTestingController, CreditsService],
    (httpClient: HttpTestingController, creditsService: CreditsService) => {
      creditsService.refreshCredits();

      const req = httpMock.expectOne('http://localhost:5000/api/v1/auth/me');
      expect(req.request.method).toBe('GET');
      req.flush({ data: { credits: 200 } });

      creditsService.credits.subscribe((credits: any) => {
        expect(credits).toBe(200);
      });
    }
  ));
});
