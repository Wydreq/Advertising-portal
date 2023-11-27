import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { LoadingService } from 'src/app/services/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url.includes('addPhoneNumberView')) {
      return next.handle(request);
    }
    this.loadingService.isLoading$.next(true);

    return next.handle(request).pipe(
      finalize(() => {
        this.loadingService.isLoading$.next(false);
      })
    );
  }
}
