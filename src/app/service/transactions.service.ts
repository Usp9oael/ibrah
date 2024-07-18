import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from './transactions';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private apiUrl = 'YOUR_API_URL_HERE';

  constructor(private http: HttpClient) { }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/transactions`);
  }

  searchTransactions(criteria: string, query: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/transactions/search?criteria=${criteria}&query=${query}`);
  }

  getAccountDetails(accountNumber: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/transactions/account/${accountNumber}`);
  }

  submitWithdrawRequest(request: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/transactions/withdraw`, request);
  }
}
