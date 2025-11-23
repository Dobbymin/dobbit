export type Sentiment = "positive" | "negative" | "neutral";

export type Summary = {
  positive: number;
  negative: number;
  neutral: number;
};

export type NewsAnalysisItem = {
  newsId: number;
  title: string;
  content: string;
  url: string;
  source: string;
  reason: string;
  keywords: string[];
  sentiment: Sentiment;
  confidence: number;
};

export type NewsItem = {
  id: number;
  title: string;
  content: string;
  url: string;
  publishedAt: string;
  source: string;
  scrapedAt: string;
};

export type NewsAnalysisData = {
  newsId: number;
  reason: string;
  keywords: string[];
  sentiment: Sentiment;
  confidence: number;
};

export type AnalysisItem = {
  date: string;
  totalNews: number;
  investmentIndex: number;
  summary: Summary;
  keywords: string[];
  newsAnalysis: NewsAnalysisData[];
};

export interface PaginatedNewsResponse {
  newsDate: string;
  totalNews: number;
  investmentIndex: number;
  summary: Summary;
  keywords: string[];
  newsAnalysis: NewsAnalysisItem[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
