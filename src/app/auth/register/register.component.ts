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
    const { email, password, confirmPassword } = form.value;
    if (password !== confirmPassword) {
      console.error('Passwords do not match');
      return;
    }
    // /api/admins/register
    this.userAuthService.postRequest('/api/open/registration/register', { email, password }, null).subscribe(
      (response) => {
        console.log('Registration successful', response);
        this.loading = false;
        this.statusMessage = 'Success';
        this.router.navigate(['/dashboard/home']);
      },
      (error) => {
        console.error('Registration failed', error);
        this.loading = false;
        // this.statusMessage = 'retry';
        this.errorMessage = 'Oops!';
        console.log(error);
      }
    );
  }
}
