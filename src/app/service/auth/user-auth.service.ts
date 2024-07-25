// user-auth.service.ts
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  private url: string = "https://smartinvest.onrender.com";
  private tokenSubject: BehaviorSubject<string | null>;

  constructor(private httpClient: HttpClient) {
    this.tokenSubject = new BehaviorSubject<string | null>(this.getToken());
  }

  public postRequest(endpoint: string, data: any): Observable<any> {
    return this.httpClient.post(`${this.url}${endpoint}`, JSON.stringify(data), {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": ""
      })
    }).pipe(
      catchError(this.handleError)
    );
  }

  public getRequest(endpoint: string): Observable<any> {
    return this.httpClient.get(`${this.url}${endpoint}`).pipe(
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

  public fetchUsers(): Observable<any> {
    return this.getRequest('/api/fetchUsers');
  }

  public getProfile(): Observable<any> {
    return this.httpClient.get(`${this.url}/api/open/admins/1`).pipe(
      catchError(this.handleError)
    );
  }

  // Method to set token
  public setToken(token: string): void {
    localStorage.setItem('token', token);
    this.tokenSubject.next(token);
  }

  // Method to get token
  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Method to remove token
  public removeToken(): void {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
  }

  // Observable to get the current token value
  public getTokenObservable(): Observable<string | null> {
    return this.tokenSubject.asObservable();
  }

  // Check if the user is logged in
  public isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
