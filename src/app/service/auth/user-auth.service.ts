import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private url: string = "https://investmentapp.onrender.com";

  constructor(private httpClient: HttpClient) { }

  public postRequest(endpoint: string, data: any, token: string | null): Observable<any> {
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": ""
    });
    return this.httpClient.post(`${this.url}${endpoint}`, JSON.stringify(data), { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  public getRequest(endpoint: string, token: string | null): Observable<any> {
    const headers = new HttpHeaders({
      "Authorization": `Bearer ${token}`,
      "ngrok-skip-browser-warning": ""
    });
    return this.httpClient.get(`${this.url}${endpoint}`, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  public fetchUsers(token: string | null, userId?: string): Observable<any> {
    return this.getRequest('/api/fetchUsers', userId || null);
  }
  
  
  
}
