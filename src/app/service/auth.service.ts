import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://investmentapp.onrender.com/api/admins';

  constructor(private http: HttpClient) { }

  /**
   * Request OTP for password reset.
   * @param email Email address for OTP request.
   * @returns Observable<any> containing the response from the API.
   */
  requestOtp(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password/request`, { email }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Verify OTP for password reset.
   * @param email Email address of the user.
   * @param otp One-time password to verify.
   * @returns Observable<any> containing the response from the API.
   */
  verifyOtp(email: string, otp: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password/verify-otp`, { email, otp }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Confirm password reset.
   * @param email Email address of the user.
   * @param otp One-time password used for verification.
   * @param newPassword New password to set.
   * @returns Observable<any> containing the response from the API.
   */
  confirmResetPassword(email: string, otp: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password/confirm`, { email, otp, newPassword }).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * Handle HTTP error responses.
   * @param error HttpErrorResponse object containing error details.
   * @returns Observable throwError with a generic error message.
   */
  private handleError(error: HttpErrorResponse): Observable<any> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong; please try again later.');
  }
}
