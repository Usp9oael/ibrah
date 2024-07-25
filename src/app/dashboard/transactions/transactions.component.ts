// src/app/dashboard/transactions/transactions.component.ts
import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../service/transactions.service';
import { Transaction } from '../../models/transaction';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
  isModalVisible: boolean = false;
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  searchQuery: string = '';
  searchCriteria: string = 'id';
searchParams: any;

firstName: string = '';  
  lastName: string = '';  
  phoneNumber: string = '';  
  accountNumber: string = '';  
  accountName: string = '';  
  amount: number = 0;  

  // Replace with your API base URL  
  private apiBaseUrl = 'https://smartinvest.onrender.com/api/open/admins/transactions';

  constructor(private transactionsService: TransactionsService, private router: Router,private http:HttpClient) { }

  ngOnInit(): void {
    this.fetchTransactions();
  }

  fetchTransactions(): void {
    this.transactionsService.getTransactions().subscribe(
      (transactions: Transaction[]) => {
        console.log("Fetched Transactions", transactions);
        this.transactions = transactions;
        this.filteredTransactions = [...this.transactions];
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching transactions', error);
      }
    );
  }

  searchTransactions() {
    if (!this.searchQuery.trim()) {
      this.filteredTransactions = [...this.transactions];
      return;
    }

    this.transactionsService.searchTransactions(this.searchCriteria, this.searchQuery).subscribe(
      (transactions: Transaction[]) => {
        this.filteredTransactions = transactions;
      },
      (error: HttpErrorResponse) => {
        console.error('Error searching transactions', error);
      }
    );
  }

  approveTransaction(transactionId: number) {
    this.transactionsService.approveTransaction(transactionId).subscribe(
      () => {
        console.log(`Transaction ${transactionId} approved successfully.`);
        // Optionally, refresh the transactions list or update the UI accordingly
      },
      (error: HttpErrorResponse) => {
        console.error('Error approving transaction', error);
      }
    );
  }
  fetchDetails() {  
    const url = `${this.apiBaseUrl}/fetch-details?firstName=${this.firstName}&lastName=${this.lastName}`;  
    this.http.get<any>(url).subscribe({  
      next: (data) => {  
        this.phoneNumber = data.phoneNumber;  
        this.accountNumber = data.accountNumber;  
      },  
      error: (error) => {  
        console.error('Error fetching user details', error);  
      }  
    });  
  }  

  submitPayment() {  
    const url = `${this.apiBaseUrl}/cash-payment`; // Change to /bank-payment as appropriate  
    const paymentData = {  
      phoneNumber: this.phoneNumber,  
      accountName: this.accountName,  
      amount: this.amount,  
      accountNumber: this.accountNumber  
    };  

    this.http.post<any>(url, paymentData).subscribe({  
      next: (result) => {  
        alert(result.message); // You might want to handle success more gracefully  
      },  
      error: (error) => {  
        console.error('Error processing payment', error);  
      }  
    });  
  }  

  openModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }
}
