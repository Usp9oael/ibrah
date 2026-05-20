import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
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
  validationErrors: string | null = null;

  constructor(private userAuthService: UserAuthService, private router: Router) {}

  async register(form: NgForm) {
    if (form.invalid) {
      this.validationErrors = 'Please fill all required fields.';
      return;
    }

    this.loading = true;
    this.statusMessage = 'Signing up...';

    const { userName, email, phoneNumber, idNumber, password } = form.value;

    try {
      // Register and create profile row if user created instantly
      const res = await this.userAuthService.registerUserAndProfile(email, password, {
        full_name: userName,
        phone: phoneNumber,
        role: 'member'
      });

      // If your project requires email confirmation, inform the user:
      if (res.user === null) {
        // user needs to confirm email
        this.statusMessage = 'Check your email to confirm your account';
        this.loading = false;
        // optionally navigate to a confirm-wait page
        return;
      }

      // If immediate sign up (no confirmation requirement)
      // set token for compatibility (session)
      const accessToken = (res.session as any)?.access_token;
      if (accessToken) this.userAuthService.setToken(accessToken);

      this.loading = false;
      this.router.navigate(['/']); // go to homepage or client dashboard
    } catch (err: any) {
      console.error(err);
      this.loading = false;
      this.validationErrors = err.message || 'Registration failed';
    }
  }
}
