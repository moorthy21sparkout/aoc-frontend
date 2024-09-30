import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InitiativeService {

  private apiURL=environment.API_BASE_URL+'/api/v1/admin';
  constructor(private http:HttpClient) { }

  /**
 * @returns An observable of the list of initiatives.
 */
  getInitiativeList(page: number, limit:number): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/list-initiatives?page=${page}&limit=${limit}&search=`);
  }

 /**
   * @param initiative The new initiative data
   */
  createInitiative(initiative: any):Observable<any> {
    return this.http.post<any>(`${this.apiURL}/create-initiative`,initiative);
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
  deleteInitiative(id:any) {
    return this.http.delete(`${this.apiURL}/delete-initiative/${id}`);

  }
    /**
   * @param {number} page - The page number to retrieve.
   * @param {number} limit - The number of initiatives to return per page.
   * @return {Observable<PaginatedResponse>} An observable containing the paginated response.
   */
  getInitiativesPageList(): Observable<any> {
    return this.http.get<any>(`${this.apiURL}/list-initiatives?page=1&limit=5&search=`);

  }
}
