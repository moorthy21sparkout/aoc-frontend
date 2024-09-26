import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { map, tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const apiService = inject(ApiService); 
  const router = inject(Router)
  return apiService.isAuthenticated().pipe(
    
    tap(isAuthenticated => {
      const route = isAuthenticated ? '/dashboard' : '/verify';
      router.navigate([route]);
    }),
    map(isAuthenticated => isAuthenticated) 
  );
};
