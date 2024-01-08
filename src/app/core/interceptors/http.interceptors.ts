import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { baseUrl } from 'src/environments/environment';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    }
    const newRequest = request.clone({
      headers: new HttpHeaders({ ...headers }),
      url: `${request.url.indexOf("assets") !== -1 ? '' : baseUrl}/${request.url}`,
      params: (request.params ? request.params : new HttpParams())
        .set('access_key', 'a7db546f46e33918a665d13772c30c35')
    })
    return next.handle(newRequest).pipe(
      map((event: HttpEvent<any>) => {
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        return throwError(error);
      })
    );
  }
}
