import { Component } from '@angular/core';
import { AdminUserService } from '../../service/admin-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private adminUserService: AdminUserService) {}

  onSubmit() {
    const user = { email: this.email, password: this.password };
    this.adminUserService.login(user).subscribe(response => {
      console.log('Login successful', response);
    }, error => {
      console.error('Login error', error);
    });
  }
}
