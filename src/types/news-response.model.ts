import { Article } from './article.model';

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}
