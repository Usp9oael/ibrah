import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms'; // Import NgForm for form handling
import { UserAuthService } from '../../service/auth/user-auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loading = false;
  statusMessage = 'Sign in'; 
  errorMessage = ''; 
  validationErrors: any;

  constructor(private userAuthService: UserAuthService, private router: Router) { }

  login(loginForm: NgForm) { // Update parameter to NgForm
    if (loginForm.invalid) {
      this.errorMessage = 'Please enter valid email and password.';
      return;
    }

    const { email, password } = loginForm.value;
    this.loading = true;
    this.statusMessage = 'Signing in...';

    this.userAuthService.postRequest('/api/admins/login', { email, password }, null).subscribe(
      (response: any) => {
        console.log('Login successful', response);
        this.loading = false;
        this.statusMessage = 'Success';
        this.router.navigate(['/dashboard/home']);
      },
      (error: any) => {
        console.error('Login failed', error);
        this.loading = false;
        this.errorMessage = 'Login failed. Please try again.';
        console.log(error.status);
      }
    );
  }
}
