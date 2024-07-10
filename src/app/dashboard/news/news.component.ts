import { Component, OnInit } from '@angular/core';
import { NewsService } from '../../service/news/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {
  newsData: any[] = []; // Initialize newsData as an empty array for type safety
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
        console.log('News Data:', data); // Check if 'data' is correctly logged
        this.newsData = data;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = error;
        this.loading = false;
      }
    );
  }
}
