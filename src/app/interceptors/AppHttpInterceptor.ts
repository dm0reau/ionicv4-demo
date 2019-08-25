import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler
} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    req = req.clone({
      headers: req.headers.set('Content-Type', 'application/json'),
      url: `${environment.apiBaseUrl}/${req.url}`
    });
    return next.handle(req);
  }
}
