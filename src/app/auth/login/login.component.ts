import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserAuthService } from '../../service/auth/user-auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {

  loading = false;
  statusMessage = 'Log In';
  validationErrors: string = '';

  constructor(private userAuthService: UserAuthService, private router: Router) {}

  login(form: NgForm) {
    if (form.invalid) {
      this.validationErrors = 'Please fill in all required fields.';
      return;
    }

    this.loading = true;
    this.statusMessage = 'Authenticating...';

    const { email, password } = form.value;

    this.userAuthService
      .login(email, password)
      .then(() => {
        this.statusMessage = 'Welcome back!';
        this.loading = false;

        // Redirect to community dashboard
        this.router.navigate(['/dashboard']);
      })
      .catch((error: any) => {
        this.validationErrors = error.message || 'Login failed. Try again.';
        this.statusMessage = 'Try again';
        this.loading = false;
      });
  }
}
