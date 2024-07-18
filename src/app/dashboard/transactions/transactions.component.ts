import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../service/transactions.service';
import { Transaction } from './transaction'; // Adjust this path if necessary
import { UserFetchService } from '../../service/UsersFetch/user-fetch.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent  {
  isModalVisible: boolean = false;
  payments: any[] = [];
  filteredPayments: any[] = [];
  searchQuery: string = '';
  searchCriteria: string = 'id';

  constructor(private userFetchService: UserFetchService, private router: Router) { }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.userFetchService.getRequest('/api/open/admin/payments').subscribe(
      (payments: any[]) => {
        this.payments = payments;
        this.filteredPayments = [...this.payments];
        console.log("Fetched Payments", payments);
      },
      (error: HttpErrorResponse) => {
        console.error('Error fetching users', error);
        if (error.error instanceof ErrorEvent) {
          console.error('Client-side error:', error.error.message);
        } else {
          console.error(`Backend returned code ${error.status}, body was: ${error.error.text}`);
        }
      }
    );
  }
  searchUsers() {
    if (!this.searchQuery.trim()) {
      this.filteredPayments = [...this.payments];
      return;
    }

    this.filteredPayments = this.payments.filter(payment => {
      const searchTerm = this.searchQuery.toLowerCase();
      switch (this.searchCriteria) {
        case 'id':
          return payment.id.toString().toLowerCase().includes(searchTerm);
        case 'Phone Number':
          return payment.phone_number.toLowerCase().includes(searchTerm);
        case 'Account Name':
          return payment.account_name.toLowerCase().includes(searchTerm);
        case 'Amount':
          return payment.amount.toLowerCase().includes(searchTerm);
        case 'Timestamp':
          return payment.Timestamp.toLowerCase().includes(searchTerm);
        case 'Financial Advisor':
          return payment.financialAdvisor.toLowerCase().includes(searchTerm);
        case 'description':
          return payment.description.toLowerCase().includes(searchTerm);
        case 'Account Number':
          return payment.account_number.toLowerCase().includes(searchTerm);
        default:
          return false;
      }
    });
  }

  deleteUser(userId: number) {
    if (confirm(`Are you sure you want to delete user ${userId}?`)) {
      this.userFetchService.deleteUser(userId).subscribe(
        () => {
          console.log(`User ${userId} deleted successfully.`);
          this.payments = this.payments.filter(user => user.id !== userId);
          this.filteredPayments = [...this.payments]; 
        },
        (error: HttpErrorResponse) => {
          console.error(`Error deleting user ${userId}:`, error);
          alert(`Error deleting user: ${error.message}`);
        }
      );
    }
  }

  openModal() {
    this.isModalVisible = true;
  }

  closeModal() {
    this.isModalVisible = false;
  }
}
