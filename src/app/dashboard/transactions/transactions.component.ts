// src/app/dashboard/transactions/transactions.component.ts
import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../service/transactions.service';
import { Transaction } from '../../models/transaction';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

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

  constructor(private transactionsService: TransactionsService, private router: Router) { }

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

  openModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }
}
