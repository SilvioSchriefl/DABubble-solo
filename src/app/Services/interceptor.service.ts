import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationServiceService } from './authentication-service.service';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService {

  constructor(
    private router: Router,
    public auth: AuthenticationServiceService
    ) { }

  
  /**
   * Intercept the HTTP request and add authorization token if available.
   *
   * @param {HttpRequest<any>} request - The HTTP request to intercept.
   * @param {HttpHandler} next - The next HTTP handler in the chain.
   * @return {Observable<HttpEvent<any>>} The observable that represents the HTTP response.
   */
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.token) {	
      request = request.clone({
        setHeaders: { Authorization: `Token ${this.auth.token}` }
      });      
    }
    return next.handle(request).pipe(catchError((err) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          this.router.navigateByUrl('sign_in');
        }
      }
      return throwError(() => err);
    }));
  }
}
