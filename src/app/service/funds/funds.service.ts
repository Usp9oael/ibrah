import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Fund } from '../../../types/fund.model';

@Injectable({
  providedIn: 'root'
})
export class FundsService {

  private baseUrl = 'https://smartinvest.onrender.com/api/open/funds';

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server returned code: ${error.status}, error message is: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  getAllFunds(): Observable<Fund[]> {
    return this.http.get<Fund[]>(this.baseUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error(
          `Backend returned code ${error.status}, ` +
          `body was: ${JSON.stringify(error.error)}`
        );
        return throwError('Something bad happened; please try again later.');
      })
    );
  }

  getFundById(id: number): Observable<Fund> {
    return this.http.get<Fund>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  createFund(fund: Fund): Observable<Fund> {
    return this.http.post<Fund>(this.baseUrl, fund, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      catchError(this.handleError)
    );
  }

  deleteFund(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      catchError(this.handleError)
    );
  }
}
