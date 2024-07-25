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
      (response: any) => {
        if (response && Array.isArray(response.articles)) {
          this.newsData = response.articles.map((item: any) => ({
            title: item.title,
            author: item.author,
            description: item.description,
            url: item.url,
            urlToImage: item.urlToImage || '',
            id: item.source.id || null,
            content: item.content,
            name: item.source.name
          }));
        } else {
          this.errorMessage = 'Invalid response structure';
        }
        this.loading = false;
      },
      (error) => {
        console.error('Error fetching news:', error); // Improved error logging
        this.errorMessage = 'Error fetching news. Please try again later.';
        this.loading = false;
      }
    );
  }
}
