import { Injectable } from '@angular/core';
import {  PaginatedResponse } from '../interfaces/initiative.interface';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InitiativeService {

  private apiURL=environment.API_BASE_URL+'api/v1/admin';
  constructor(private http:HttpClient) { }

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
    /**
   * @param {number} page - The page number to retrieve.
   * @param {number} limit - The number of initiatives to return per page.
   * @return {Observable<PaginatedResponse>} An observable containing the paginated response.
   */
  getInitiativesPageList(page: number, limit: number): Observable<PaginatedResponse> {
    return this.http.get<PaginatedResponse>(`${this.apiURL}/initiatives?page=${page}&limit=${limit}`);

  }
}
