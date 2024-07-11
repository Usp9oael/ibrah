import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserFetchService {
  private url = 'https://investmentapp.onrender.com';

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

  public deleteUser(userId: number): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "ngrok-skip-browser-warning": ""
    });
    const url = `${this.url}/api/fetchUsers/${userId}`;
    return this.httpClient.delete(url, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}\nBody: ${error.error.text}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
