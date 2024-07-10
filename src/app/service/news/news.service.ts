import { Injectable } from '@angular/core';
import axios from 'axios';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  private apiUrl = 'https://investmentapp.onrender.com/api/news'; // Replace with your actual API endpoint

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
        observer.next(response.data.data); // Extract 'data' array from response
        observer.complete();
      })
      .catch(error => {
        console.error('Error fetching news:', error);
        observer.error('Error fetching news. Please try again later.');
      });
    });
  }
  
  
}
