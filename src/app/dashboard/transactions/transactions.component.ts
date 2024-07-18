import { Component, OnInit } from '@angular/core';
import { TransactionsService } from '../../service/transactions.service';
import { Transaction } from './transaction'; // Adjust this path if necessary

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {
searchUsers() {
throw new Error('Method not implemented.');
}
viewUserDetails(arg0: any) {
throw new Error('Method not implemented.');
}
deleteUser(arg0: any) {
throw new Error('Method not implemented.');
}
  searchQuery: string = '';
  filteredTransactions: Transaction[] = [];
  isModalVisible: boolean = false;
  isAccountDetailsVisible: boolean = false;
  isWithdrawFormVisible: boolean = false;
  accountDetails: any = {};
  withdrawRequest: any = {};
filteredUsers: any;

  constructor(private transactionsService: TransactionsService) { }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactionsService.getTransactions().subscribe(transactions => {
      this.filteredTransactions = transactions;
    });
  }

  searchTransactions(): void {
    const criteria = (document.getElementById('searchCriteria') as HTMLSelectElement).value;
    this.transactionsService.searchTransactions(criteria, this.searchQuery).subscribe(transactions => {
      this.filteredTransactions = transactions;
    });
  }

  openModal(): void {
    this.isModalVisible = true;
  }

  closeModal(): void {
    this.isModalVisible = false;
  }

  viewTransactionDetails(transactionId: string): void {
    // Logic to view transaction details
  }

  deleteTransaction(transactionId: string): void {
    // Logic to delete transaction
  }

  openAccountDetails(accountNumber: string): void {
    this.transactionsService.getAccountDetails(accountNumber).subscribe(details => {
      this.accountDetails = details;
      this.isAccountDetailsVisible = true;
    });
  }

  closeAccountDetails(): void {
    this.isAccountDetailsVisible = false;
  }

  openWithdrawForm(accountNumber: string): void {
    this.withdrawRequest = {
      accountNumber: accountNumber,
      totalBalance: '',
      paymentMethod: '',
      bankDetails: '',
      reason: ''
    };
    this.isWithdrawFormVisible = true;
  }

  closeWithdrawForm(): void {
    this.isWithdrawFormVisible = false;
  }

  submitWithdrawRequest(): void {
    this.transactionsService.submitWithdrawRequest(this.withdrawRequest).subscribe(response => {
      // Handle response
      this.isWithdrawFormVisible = false;
    });
  }
}
