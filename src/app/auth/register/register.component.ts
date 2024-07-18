import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthService } from '../../service/auth/user-auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  loading = false;
  statusMessage = 'Register'; 
  errorMessage = ''; 
  validationErrors: any;

  constructor(private userAuthService: UserAuthService, private router: Router) { }

  register(form: any) {
    this.loading = true;
    this.statusMessage = 'Signing up...';
    const { userName, email, phoneNumber, idNumber, password } = form.value;
    this.userAuthService.postRequest('/api/admins/register', { userName, email, phoneNumber, idNumber, password }, null).subscribe(
      (response) => {
        console.log('Registration successful', response);
        this.loading = false;
        this.statusMessage = 'Success';
        this.router.navigate(['/dashboard/home']);
      },
      (error) => {
        console.error('Registration failed', error);
        this.loading = false;
        this.errorMessage = 'Oops!';
        console.log(error);
      }
    );
  }
}
