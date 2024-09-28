import { CanActivateFn , Router  } from '@angular/router';
import {  inject } from '@angular/core';
import { ApiService } from '../services/api.service';

export const authGuard: CanActivateFn = (route, state) => {
  const apiService =inject(ApiService);
  const connected = apiService.inAuthenticate();
  const router = inject(Router);
    if(!connected) {
      console.log("not connected");
      
    router.navigate(['/']);
    return false;
  }else{
    return true;
  }
};
