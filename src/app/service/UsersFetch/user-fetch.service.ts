import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../../../types/user.model'; // Adjust the import path as necessary

@Injectable({
  providedIn: 'root'
})
export class UserFetchService {
  private url = 'https://ef8f-41-80-112-189.ngrok-free.app';

  constructor(private httpClient: HttpClient) {}

  public postRequest(endpoint: string, data: any): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": ""
    });
    return this.httpClient.post(`${this.url}${endpoint}`, JSON.stringify(data), { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  public getRequest(endpoint: string, userId?: string): Observable<any> {
    const headers = new HttpHeaders({
      "ngrok-skip-browser-warning": ""
    });
    let url = `${this.url}${endpoint}`;
    if (userId) {
      url += `/${userId}`;
    }
    return this.httpClient.get(url, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  // Implementing getUserById
  public getUserById(userId: string): Observable<User> {
    return this.getRequest('/api/fetchUsers', userId) as Observable<User>;
  }

  public deleteUser(userId: number): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": ""
    });
    const deleteUrlWithId = `${this.url}/api/fetchUsers/${userId}`;
    return this.httpClient.delete(deleteUrlWithId, { headers })
      .pipe(
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
