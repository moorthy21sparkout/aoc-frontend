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
  sendAccountAddress(address: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { address });
  }

  getInitiativeList(): Observable<any> {
    return this.http.get<any>(`${environment.API_BASE_URL}/list-initiatives?page=1&limit=5&search=`);
  }

  addInitiative(initiative: any):Observable<any> {
    return this.http.post<any>(`${environment.API_BASE_URL}/add-initiative`,initiative);
  }

    // Fetch Initiative by ID
    getInitiativeById(id: string) {
      return this.http.get(`/api/v1/admin/initiative/${id}`);
    }
   // Update Initiative
   updateInitiative(id: string, initiativeData: any):Observable<any> {
    return this.http.put(`/api/v1/admin/initiative/${id}`, initiativeData);
  }
  inAuthenticate(): boolean {
    const wagmiAccount = JSON.parse(localStorage.getItem('wagmi.store') || '{}');
    return !!wagmiAccount?.state?.data?.account; // Returns true if connected
  }

}