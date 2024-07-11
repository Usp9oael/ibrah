import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'https://investmentapp.onrender.com/api/news';

  constructor() {}

  getToken(): string {
    return localStorage.getItem('authToken') || '';
  }

  getNews(): Observable<any[]> {
    return new Observable(observer => {
      const token = this.getToken();
      axios.get(this.apiUrl, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        console.log('API Response:', response); // Log the entire API response
        if (response.data && response.data.data) {
          observer.next(response.data.data);
          observer.complete();
        } else {
          observer.error('Invalid response structure');
        }
      })
      .catch(error => {
        console.error('Error fetching news:', error);
        observer.error('Error fetching news. Please try again later.');
      });
    });
  }
}
