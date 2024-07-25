import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../../../types/user.model'; // Adjust the import path as necessary

@Injectable({
  providedIn: 'root'
})
export class UserFetchService {
  private url = 'https://smartinvest.onrender.com';

  constructor(private httpClient: HttpClient) {}

  public postRequest(endpoint: string, data: any): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    return this.httpClient.post(`${this.url}${endpoint}`, JSON.stringify(data), { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  public getRequest(endpoint: string, userId?: string): Observable<any> {
    const headers = new HttpHeaders({});
    let url = `${this.url}${endpoint}`;
    if (userId) {
      url += `/${userId}`;
    }
    return this.httpClient.get(url, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  public getUserById(userId: string): Observable<User> {
    return this.getRequest('/api/open/fetchUsers', userId) as Observable<User>;
  }

  public deleteUser(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/api/open/fetchUsers/${id}`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      catchError(this.handleError)
    );
  }
  

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}\nBody: ${error.error?.text || JSON.stringify(error.error)}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
