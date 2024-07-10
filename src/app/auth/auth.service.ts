// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'YOUR_API_URL_HERE'; // Replace with your API URL

  constructor(private http: HttpClient) {}

  requestOtp(email: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/request-otp`, { email });
  }

  resetPassword(email: string, otp: string, newPassword: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/reset-password`, { email, otp, newPassword });
  }
}
