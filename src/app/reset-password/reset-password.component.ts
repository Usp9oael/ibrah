// reset-password.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service'; // Update this path to match the location of AuthService

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  step: 'requestOtp' | 'verifyOtp' | 'resetPassword' = 'requestOtp';
  email: string = '';
  otp: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  message: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  requestOtp() {
    this.authService.requestOtp(this.email).subscribe(
      response => {
        this.step = 'verifyOtp';
      },
      error => {
        this.errorMessage = 'Error requesting OTP';
      }
    );
  }

  verifyOtp() {
    this.authService.verifyOtp(this.email, this.otp).subscribe(
      response => {
        this.step = 'resetPassword';
      },
      error => {
        this.errorMessage = 'Error verifying OTP';
      }
    );
  }

  resetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.authService.resetPassword(this.email, this.otp, this.newPassword).subscribe(
      response => {
        this.message = 'Password reset successfully';
        this.router.navigate(['/login']);
      },
      error => {
        this.errorMessage = 'Error resetting password';
      }
    );
  }
}
