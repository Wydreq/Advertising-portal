import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PurchasesService } from './purchases.service';

describe('PurchasesService', () => {
  let service: PurchasesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PurchasesService],
    });

    service = TestBed.inject(PurchasesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user sold items', inject(
    [HttpTestingController, PurchasesService],
    (httpClient: HttpTestingController, purchasesService: PurchasesService) => {
      purchasesService.getUserSoldItems().subscribe((response: any) => {
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne(
        'http://localhost:5000/api/v1/purchases/sold'
      );
      expect(req.request.method).toBe('GET');
      req.flush({});
    }
  ));

  it('should get user purchased items', inject(
    [HttpTestingController, PurchasesService],
    (httpClient: HttpTestingController, purchasesService: PurchasesService) => {
      purchasesService.getUserPurchasedItems().subscribe((response: any) => {
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne(
        'http://localhost:5000/api/v1/purchases/purchased'
      );
      expect(req.request.method).toBe('GET');
      req.flush({});
    }
  ));

  it('should set item on delivery', inject(
    [HttpTestingController, PurchasesService],
    (httpClient: HttpTestingController, purchasesService: PurchasesService) => {
      const itemId = '1';

      purchasesService.setItemOnDelivery(itemId).subscribe((response: any) => {
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne(
        `http://localhost:5000/api/v1/purchases/${itemId}/delivery`
      );
      expect(req.request.method).toBe('GET');
      req.flush({});
    }
  ));

  it('should purchase item', inject(
    [HttpTestingController, PurchasesService],
    (httpClient: HttpTestingController, purchasesService: PurchasesService) => {
      const itemId = '1';
      const addressId = '2';

      purchasesService
        .purchaseItem(itemId, addressId)
        .subscribe((response: any) => {
          expect(response).toBeTruthy();
        });

      const req = httpMock.expectOne(
        `http://localhost:5000/api/v1/purchases/${itemId}/buy`
      );
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ deliveryAddress: addressId });
      req.flush({});
    }
  ));
});
