import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  email: string = '';
  otp: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  message: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  /**
   * Request OTP for password reset.
   */
  requestOtp() {
    this.authService.requestOtp(this.email).subscribe(
      () => {
        this.message = 'OTP sent successfully';
      },
      (error) => {
        this.errorMessage = this.extractErrorMessage(error);
        console.error('Error requesting OTP:', error); // Log the error for debugging
      }
    );
  }

  /**
   * Verify OTP for password reset.
   */
  verifyOtp() {
    this.authService.verifyOtp(this.email, this.otp).subscribe(
      () => {
        this.message = 'OTP verified successfully';
      },
      (error) => {
        this.errorMessage = this.extractErrorMessage(error);
        console.error('Error verifying OTP:', error); // Log the error for debugging
      }
    );
  }

  /**
   * Confirm password reset.
   */
  resetPassword() {
    if (this.newPassword !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    this.authService.confirmResetPassword(this.email, this.otp, this.newPassword).subscribe(
      () => {
        this.message = 'Password reset successful';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      (error) => {
        this.errorMessage = this.extractErrorMessage(error);
        console.error('Error resetting password:', error); // Log the error for debugging
      }
    );
  }

  /**
   * Extract error message from HttpErrorResponse.
   * @param error HttpErrorResponse object containing error details.
   * @returns Error message string.
   */
  private extractErrorMessage(error: any): string {
    if (error.error && error.error.message) {
      return error.error.message;
    } else if (error.message) {
      return error.message;
    } else {
      return 'An error occurred. Please try again later.';
    }
  }
}
