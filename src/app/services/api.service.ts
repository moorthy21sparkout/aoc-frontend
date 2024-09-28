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
  sendAccountAddress(address: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { address });
  }

  /**
   * @returns True if authenticated (connected to a wallet)
   */
  inAuthenticate(): boolean {
    const wagmiAccount = JSON.parse(localStorage.getItem('wagmi.store') || '{}');
    return !!wagmiAccount?.state?.data?.account; // Returns true if connected
  }

/**
 * @returns An observable of the list of initiatives. 
 */
  getInitiativeList(): Observable<any> {
    return this.http.get<any>(`${environment.API_BASE_URL}/list-initiatives?page=1&limit=5&search=`);
  }

 /**
   * @param initiative The new initiative data
   */
  addInitiative(initiative: any):Observable<any> {
    return this.http.post<any>(`${environment.API_BASE_URL}/add-initiative`,initiative);
  }

  /**
   * @param id The id of the initiative to fetch
   */
 
    getInitiativeById(id: string) {
      return this.http.get(`/api/v1/admin/initiative/${id}`);
    }

    
  /**
   * @param id The id of the initiative to update.
   * @returns An observable of the update result.
   */
   updateInitiative(id: string, initiativeData: any):Observable<any> {
    return this.http.put(`/api/v1/admin/initiative/${id}`, initiativeData);
  }

  /**
   * @param id The id of the initiative to delete.
   */
  deleteInitiative(id:string){
    return this.http.delete(`${environment.API_BASE_URL}/initiatives/${id}`);

  }

}