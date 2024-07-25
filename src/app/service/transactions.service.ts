// src/app/service/transactions.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaction } from '../models/transaction';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

  private apiUrl = 'https://smartinvest.onrender.com';

  constructor(private http: HttpClient) { }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/api/open/daraja/all-transactions`);
  }

  searchTransactions(criteria: string, query: string): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/transactions/search?criteria=${criteria}&query=${query}`);
  }

  getAccountDetails(accountNumber: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/transactions/account/${accountNumber}`);
  }

  approveTransaction(transactionId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/transactions/approve/${transactionId}`, {});
  }

  createBankTransaction(transaction: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/open/admins/transactions/bank-payment`, transaction);
  }
  
  createCashTransaction(transaction: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/open/admins/transactions/cash-payment`, transaction);
  }
}
