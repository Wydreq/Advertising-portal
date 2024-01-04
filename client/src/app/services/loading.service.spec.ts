import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let loadingService: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService],
    });

    loadingService = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(loadingService).toBeTruthy();
  });

  it('should start loading', () => {
    loadingService.startLoading();

    loadingService.isLoading$.subscribe((isLoading) => {
      expect(isLoading).toBe(true);
    });
  });

  it('should stop loading', () => {
    loadingService.stopLoading();

    loadingService.isLoading$.subscribe((isLoading) => {
      expect(isLoading).toBe(false);
    });
  });
});
