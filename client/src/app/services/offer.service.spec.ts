import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { OffersService } from './offers.service';

describe('OffersService', () => {
  let service: OffersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OffersService],
    });

    service = TestBed.inject(OffersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all offers', inject(
    [HttpTestingController, OffersService],
    (httpClient: HttpTestingController, offersService: OffersService) => {
      offersService.getAllOffers();

      const req = httpMock.expectOne('http://localhost:5000/api/v1/offers');
      expect(req.request.method).toBe('GET');
      req.flush({});
    }
  ));

  it('should get active offers', inject(
    [HttpTestingController, OffersService],
    (httpClient: HttpTestingController, offersService: OffersService) => {
      offersService.getActiveOffers();

      const req = httpMock.expectOne(
        'http://localhost:5000/api/v1/offers?status=new'
      );
      expect(req.request.method).toBe('GET');
      req.flush({});
    }
  ));

  it('should get filtered offers', inject(
    [HttpTestingController, OffersService],
    (httpClient: HttpTestingController, offersService: OffersService) => {
      const options = {
        content: 'example',
        category: { name: 'Electronics' },
      };

      offersService.getFilteredOffers(options);

      const expectedUrl =
        'http://localhost:5000/api/v1/offers?name=example&category=Electronics';
      const req = httpMock.expectOne(expectedUrl);
      expect(req.request.method).toBe('GET');
      req.flush({});
    }
  ));

  it('should create new offer', inject(
    [HttpTestingController, OffersService],
    (httpClient: HttpTestingController, offersService: OffersService) => {
      const offer = {
        name: 'Example Offer',
        category: 'Electronics',
        description: 'This is an example offer',
        price: 100,
      };

      offersService.createNewOffer(offer).subscribe((response: any) => {
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne('http://localhost:5000/api/v1/offers');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(offer);
      req.flush({});
    }
  ));

  it('should delete offer', inject(
    [HttpTestingController, OffersService],
    (httpClient: HttpTestingController, offersService: OffersService) => {
      const offerId = '1';

      offersService.deleteOffer(offerId).subscribe((response: any) => {
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne(
        `http://localhost:5000/api/v1/offers/${offerId}`
      );
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    }
  ));

  it('should edit offer', inject(
    [HttpTestingController, OffersService],
    (httpClient: HttpTestingController, offersService: OffersService) => {
      const offer = {
        name: 'Updated Offer',
        category: 'Electronics',
        description: 'This is an updated offer',
        price: 150,
      };
      const offerId = '1';

      offersService
        .editOffer(offer, null, offerId)
        .subscribe((response: any) => {
          expect(response).toBeTruthy();
        });

      const req = httpMock.expectOne(
        `http://localhost:5000/api/v1/offers/${offerId}`
      );
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(offer);
      req.flush({});
    }
  ));
});
