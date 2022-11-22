import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { finalize, Observable, tap } from 'rxjs';
@Injectable()
export class LoggingInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let ok: string
    return next.handle(request).pipe(tap({
      next: (event) => (ok = event instanceof HttpResponse ? `succeeded with ${event.status}` : ''),
      error: (error) => (ok = `failed with ${error.status}`),
    }),
      finalize(() => {
        console.log(`API ${request.method} ${request.urlWithParams} ${ok}`)
      })
    );
  }
}
