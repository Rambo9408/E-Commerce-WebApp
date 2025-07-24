import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
/* HttpInterceptor is an interface which allows us to intercept and modify HTTP requests or responses globally before they are sent to the server or after the response is received. */

export class AuthInterceptor implements HttpInterceptor {
  /* An interceptor is a special Angular service that allows you to:

  Modify outgoing HTTP requests (e.g., add an authorization token).

  Handle responses globally (e.g., catch errors, log, etc.). */

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');

    if (token) {
      // here we clone the httprequest as it is immutable so we clone it and make changes and Sends the cloned request (with the token) to the server.
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
      return next.handle(cloned);// from here we send the cloned request
    }

    return next.handle(req);
  }
}
