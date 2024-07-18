import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-transactionmodal',
  templateUrl: './transactionmodal.component.html',
  styleUrl: './transactionmodal.component.css'
})
export class TransactionmodalComponent {
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();
  userForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.userForm = this.fb.group({
      phone_number: ['', Validators.required],
      account_number: ['', Validators.required],
      amount: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  closeModal() {
    this.isVisible = false;
    this.close.emit();
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.http.post('/api/open/admin/trasactions/new-payment', this.userForm.value).subscribe(
        response => {
          console.log('User created successfully', response);
          this.closeModal();
        },
        error => {
          console.error('Error creating user', error);
        }
      );
    }
  }


}
