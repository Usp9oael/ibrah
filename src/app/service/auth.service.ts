// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://investmentapp-1.onrender.com'; // Your API URL

  constructor(private http: HttpClient) {}

  requestOtp(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/admins/reset-password/request`, { email });
  }

  verifyOtp(email: string, otp: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/admins/reset-password/verify-otp`, { email, otp });
  }

  resetPassword(email: string, otp: string, newPassword: string): Observable<any> {
    const payload = { email, otp, newPassword };
    return this.http.post<any>('https://investmentapp-1.onrender.com/api/admins/reset-password/confirm', payload);
  }
  
}
