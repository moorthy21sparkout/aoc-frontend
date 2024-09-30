import {inject } from '@angular/core';
import{  HttpInterceptorFn, HttpHandler,HttpEvent,HttpErrorResponse,HttpRequest} from  '@angular/common/http';
import {  throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  const toastr = inject(ToastrService);
  const token = localStorage.getItem('session_token');
  
  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authReq).pipe(
    catchError((error) => {
      if (error.status === 401) {
        toastr.error('Session expired. Please log in again.');
        router.navigate(['/']); // Redirect to login or home page
      }

      return throwError(() => error);
    })
  );
};
