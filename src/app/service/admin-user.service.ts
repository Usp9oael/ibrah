import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environmentSwagger } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminUserService {
  private apiUrl = `${environmentSwagger.apiUrl}/admin-user-registrations`;

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, user);
  }

  login(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, user);
  }
}
