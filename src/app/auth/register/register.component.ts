import { Component } from '@angular/core';
import { AdminUserService } from '../../service/admin-user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private adminUserService: AdminUserService) {}

  onSubmit() {
    const user = { name: this.name, email: this.email, password: this.password };
    this.adminUserService.register(user).subscribe(response => {
      console.log('Registration successful', response);
    }, error => {
      console.error('Registration error', error);
    });
  }
}
