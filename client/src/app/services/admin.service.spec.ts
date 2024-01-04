import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AdminService } from './admin.service';

describe('AdminService', () => {
  let service: AdminService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdminService],
    });

    service = TestBed.inject(AdminService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch users', inject(
    [HttpTestingController, AdminService],
    (httpClient: HttpTestingController, adminService: AdminService) => {
      const mockUsers = [
        { id: '1', username: 'user1' },
        { id: '2', username: 'user2' },
      ];

      adminService.onUsersFetch().subscribe((users: any) => {
        expect(users).toEqual(mockUsers);
      });

      const req = httpMock.expectOne(
        'http://localhost:5000/api/v1/admin/users'
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockUsers);
    }
  ));

  it('should update user', inject(
    [HttpTestingController, AdminService],
    (httpClient: HttpTestingController, adminService: AdminService) => {
      const userId = '1';
      const status = 'active';

      adminService.updateUser(status, userId).subscribe((response: any) => {
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne(
        `http://localhost:5000/api/v1/admin/users/${userId}`
      );
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual({ status: status });
      req.flush({});
    }
  ));

  it('should delete user', inject(
    [HttpTestingController, AdminService],
    (httpClient: HttpTestingController, adminService: AdminService) => {
      const userId = '1';

      adminService.deleteUser(userId).subscribe((response: any) => {
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne(
        `http://localhost:5000/api/v1/admin/users/${userId}`
      );
      expect(req.request.method).toBe('DELETE');
      req.flush({});
    }
  ));
});
