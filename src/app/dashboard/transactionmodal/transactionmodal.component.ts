import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transaction } from '../transactions/transaction';
import { TransactionsService } from '../../service/transactions.service';

@Component({
  selector: 'app-transactionmodal',
  templateUrl: './transactionmodal.component.html',
  styleUrls: ['./transactionmodal.component.css']
})
export class TransactionmodalComponent {
  @Input() isVisible: boolean = false;
  @Input() transactionType: string = '';
  @Output() close = new EventEmitter<void>();
  transactionForm: FormGroup;
  apiUrl: string = 'https://smartinvest.onrender.com';
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
  private apiBaseUrl = 'https://smartinvest.onrender.com/api/open/admins/transactions';

  constructor(private transactionsService: TransactionsService, private fb: FormBuilder, private http: HttpClient) {
    this.transactionForm = this.fb.group({
      phoneNumber: ['', Validators.required],
      accountName: ['', Validators.required],
      amount: ['', Validators.required],
      accountNumber: ['', Validators.required],
      transactionType: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.transactionType) {
      this.transactionForm.patchValue({ transactionType: this.transactionType });
    }
  }

  closeModal() {
    this.isVisible = false;
    this.close.emit();
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
    const normalizedQuery = this.searchQuery.trim().toLowerCase();
    if (!normalizedQuery) {
      this.filteredTransactions = [...this.transactions];
      return;
    }
    this.filteredTransactions = this.transactions.filter((transaction: any) => {
      const searchField = (transaction[this.searchCriteria] || '').toString().toLowerCase();
      return searchField.includes(normalizedQuery);
    });
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
    let url = '';

    if (this.transactionType === 'cash') {
      url = `${this.apiBaseUrl}/cash-payment`;
    } else if (this.transactionType === 'bank') {
      url = `${this.apiBaseUrl}/bank-payment`;
    }

    const paymentData = {  
      phoneNumber: this.phoneNumber,  
      accountName: this.accountName,  
      amount: this.amount,  
      accountNumber: this.accountNumber  
    };  

    this.http.post<any>(url, paymentData).subscribe({  
      next: (result) => {  
        alert(result.message);
      },  
      error: (error) => {  
        console.error('Error processing payment', error);  
      }  
    });  
  }  
}
