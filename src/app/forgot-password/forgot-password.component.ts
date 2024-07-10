// forgot-password.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  email!: string;
  message!: string;
  errorMessage!: string;

  constructor(private authService: AuthService, private router: Router) {}

  requestOtp() {
    this.authService.requestOtp(this.email).subscribe(
      response => {
        this.message = 'OTP sent to your email';
        setTimeout(() => {
          this.router.navigate(['/reset-password']);
        }, 2000);
      },
      error => {
        this.errorMessage = 'Failed to send OTP. Please try again.';
      }
    );
  }
}
