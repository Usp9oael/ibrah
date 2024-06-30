import { Component } from '@angular/core';
import { User } from '../../user';
import { MatDialogRef } from '@angular/material/dialog';
import { UserAuthService } from '../../service/auth/user-auth.service';

@Component({
  selector: 'app-createuserdialog',
  templateUrl: './createuserdialog.component.html',
  styleUrl: './createuserdialog.component.css'
})
export class CreateuserdialogComponent {
  name = '';
  email = '';
  password = '';

  constructor(
    private userService: UserAuthService,
    public dialogRef: MatDialogRef<CreateuserdialogComponent>
  ) {}

  createUser() {
    const newUser: User = {
      name: this.name,
      email: this.email,
      password: this.password,
      // showPassword: false
    };
    this.userService.addUser(newUser);
    this.dialogRef.close();
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
