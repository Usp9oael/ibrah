import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../service/news/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  newsData: any[] = [];
  loading = false;
  errorMessage = '';

  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.fetchNews();
  }

  fetchNews(): void {
    this.loading = true;
    this.newsService.getNews().subscribe(
      (data: any[]) => {
        console.log('News Data:', data); // Log the entire response to ensure imageUrl is present
        this.newsData = data;
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching news:', error); // Improved error logging
        this.errorMessage = error;
        this.loading = false;
      }
    );
  }
}
