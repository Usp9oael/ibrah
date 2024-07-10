import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from '../../user';
import { MatDialogRef } from '@angular/material/dialog';
import { UserAuthService } from '../../service/auth/user-auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-createuserdialog',
  templateUrl: './createuserdialog.component.html',
  styleUrl: './createuserdialog.component.css'
})
export class CreateuserdialogComponent {
  @Input() isVisible: boolean = false;
  @Output() close = new EventEmitter<void>();

  userForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.userForm = this.fb.group({
      surname: ['', Validators.required],
      middleName: ['', Validators.required],
      firstName: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      idPassportNo: ['', Validators.required],
      nationality: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      postalAddress: ['', Validators.required],
      accountName: ['', Validators.required],
      accountNumber: ['', Validators.required],
      accountType: ['', Validators.required],
      bankName: ['', Validators.required],
      branch: ['', Validators.required],
      bankCode: ['', Validators.required],
      nextOfKin: this.fb.group({
        name: ['', Validators.required],
        relationship: ['', Validators.required],
        idPassportNo: ['', Validators.required],
        telephoneNumber: ['', Validators.required]
      }),
      idPicture: this.fb.group({
        frontSidePath: ['', Validators.required],
        backSidePath: ['', Validators.required]
      })
    });
  }

  closeModal() {
    this.isVisible = false;
    this.close.emit();
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.http.post('/api/fetchUsers', this.userForm.value).subscribe(
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
