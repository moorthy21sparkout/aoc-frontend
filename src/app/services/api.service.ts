import { Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private accountAddressSignal = signal<string | null>(null);
  private apiUrl = environment.API_BASE_URL;
  constructor(private http: HttpClient) { }
  sendAccountAddress(address: string): Observable<any> {
    console.log("the value of address",address);
    console.log("the value of api",this.http.post(`${this.apiUrl}/account`, { address }));
    this.setAccountAddress(address);
    return this.http.post(`${this.apiUrl}`, { address }); 
  }
  isAuthenticated(): Observable<boolean> {
    return this.http.get<{ authenticated: boolean }>(`${this.apiUrl}/account`) 
      .pipe(
        map(response => response.authenticated), 
        catchError(() => of(false)) 
      );
  }
  setAccountAddress(address: string) {
    console.log("set",address);
      
    this.accountAddressSignal.set(address); 
  }

  get accountAddress() {
    console.log("va;ue",this.accountAddressSignal.asReadonly())
      return this.accountAddressSignal.asReadonly(); 
    }

  getFormattedAddress(): string {
    const address = this.accountAddressSignal(); // Get the current address from the signal
    console.log("Current address:", address);
    
    // Retrieve the account from local storage
    const wagmiStore = JSON.parse(localStorage.getItem('wagmi.store') || '{}');
    console.log("Wagmi Store:", wagmiStore);

    const account = wagmiStore.state?.data?.account;
    console.log("Wagmi Store Account:", account);

    // Compare the stored account with the current address
    if (account && address && account === address) {
      console.log("Current account matches:", address);
      return `${address.slice(0, 5)}...${address.slice(-4)}`; // Show first 5 and last 4 characters
    }

    return 'Not connected'; // Default text if address is null or doesn't match
  }


}
