import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

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

  constructor(private fb: FormBuilder, private http: HttpClient) {
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

  onSubmit() {
    if (this.transactionForm.valid) {
      const transaction = this.transactionForm.value;
      
      let apiCall: Observable<any>;

      if (this.transactionType === 'Bank') {
        apiCall = this.createBankTransaction(transaction);
      } else if (this.transactionType === 'Cash') {
        apiCall = this.createCashTransaction(transaction);
      } else {
        console.error('Invalid transaction type');
        return;
      }
      
      apiCall.subscribe(
        response => {
          console.log('Transaction created successfully', response);
          this.closeModal();
        },
        error => {
          console.error('Error creating transaction', error);
        }
      );
    }
  }

  createBankTransaction(transaction: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/open/admins/transactions/bank-payment`, transaction);
  }
  
  createCashTransaction(transaction: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/api/open/admins/transactions/cash-payment`, transaction);
  }
}
