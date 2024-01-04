import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { NegotiateService } from './negotiate.service';

describe('NegotiateService', () => {
  let service: NegotiateService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [NegotiateService],
    });

    service = TestBed.inject(NegotiateService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start negotiation', inject(
    [HttpTestingController, NegotiateService],
    (httpClient: HttpTestingController, negotiateService: NegotiateService) => {
      const offerId = '1';
      const buyerMaxPrice = 100;
      const deliveryAddress = '123 Main St';

      negotiateService
        .startNegotiate(offerId, buyerMaxPrice, deliveryAddress)
        .subscribe((response: any) => {
          expect(response).toBeTruthy();
        });

      const req = httpMock.expectOne(
        'http://localhost:5000/api/v1/negotiation'
      );
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({
        offerId,
        deliveryAddress,
        buyerMaxPrice,
      });
      req.flush({});
    }
  ));

  it('should get all buyer negotiations', inject(
    [HttpTestingController, NegotiateService],
    (httpClient: HttpTestingController, negotiateService: NegotiateService) => {
      negotiateService.getAllBuyerNegotiations().subscribe((response: any) => {
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne(
        'http://localhost:5000/api/v1/negotiation/buyer'
      );
      expect(req.request.method).toBe('GET');
      req.flush({});
    }
  ));

  it('should get negotiation by id', inject(
    [HttpTestingController, NegotiateService],
    (httpClient: HttpTestingController, negotiateService: NegotiateService) => {
      const negotiationId = '1';

      negotiateService
        .getNegotiation(negotiationId)
        .subscribe((response: any) => {
          expect(response).toBeTruthy();
        });

      const req = httpMock.expectOne(
        `http://localhost:5000/api/v1/negotiation/${negotiationId}`
      );
      expect(req.request.method).toBe('GET');
      req.flush({});
    }
  ));

  it('should accept negotiation', inject(
    [HttpTestingController, NegotiateService],
    (httpClient: HttpTestingController, negotiateService: NegotiateService) => {
      const negotiationId = '1';

      negotiateService
        .acceptNegotiation(negotiationId)
        .subscribe((response: any) => {
          expect(response).toBeTruthy();
        });

      const req = httpMock.expectOne(
        `http://localhost:5000/api/v1/negotiation/${negotiationId}/accept`
      );
      expect(req.request.method).toBe('GET');
      req.flush({});
    }
  ));
});
