// fund.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Fund } from '../../../types/fund.model';

@Injectable({
  providedIn: 'root'
})
export class FundsService {

  private baseUrl = 'https://investmentapp.onrender.com/api/funds';

  constructor(private http: HttpClient) {}

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

  getAllFunds(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
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
    return this.http.post<Fund>(this.baseUrl, fund).pipe(
      catchError(this.handleError)
    );
  }

  deleteFund(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
}
