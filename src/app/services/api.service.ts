import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import {  Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = environment.API_BASE_URL+'/api/v1/admin';
  constructor(private http: HttpClient) { }
  /**
   * @param address The user's wallet address.
   * @returns An observable with the response of the API.
   */
  sendAccountAddress(wallet_address: string): Observable<any> {
    console.log("sendAccountAddress", wallet_address);
    
    return this.http.post(`${this.apiUrl}/login`, {wallet_address});
  }

  /**
   * @returns True if authenticated (connected to a wallet)
   */
  inAuthenticate(): boolean {
    const wagmiAccount = JSON.parse(localStorage.getItem('wagmi.store') || '{}');
    return !!wagmiAccount?.state?.data?.account;
  }
}
