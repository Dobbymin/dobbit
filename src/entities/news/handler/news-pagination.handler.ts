import { AnalysisItem, NewsAnalysisItem, NewsItem, Summary, analysisAPI, newsAPI } from "../model";

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

const ITEMS_PER_PAGE = 5;

export const newsPaginationHandler = async (page: number = 0): Promise<PaginatedNewsResponse> => {
  // 두 API를 병렬로 호출
  const [newsResponse, analysisResponse] = await Promise.all([newsAPI(), analysisAPI()]);

  if (!newsResponse.success || !analysisResponse.success) {
    throw new Error("Failed to fetch news data");
  }

  const newsData = newsResponse.data as NewsItem[];
  const analysisData = analysisResponse.data as AnalysisItem;

  // newsId를 기준으로 analysis 데이터를 Map으로 변환 (빠른 조회를 위해)
  const analysisMap = new Map(analysisData.newsAnalysis.map((item) => [item.newsId, item]));

  // newsData와 analysisData.newsAnalysis를 newsId 기준으로 매칭
  const combinedNewsAnalysis: NewsAnalysisItem[] = newsData.map((news) => {
    // analysisMap에서 같은 newsId를 가진 분석 찾기
    const analysis = analysisMap.get(news.id) || {
      newsId: news.id,
      reason: "",
      keywords: [],
      sentiment: "neutral" as const,
      confidence: 0,
    };

    return {
      newsId: news.id,
      title: news.title,
      content: news.content,
      url: news.url,
      source: news.source,
      reason: analysis.reason,
      keywords: analysis.keywords,
      sentiment: analysis.sentiment,
      confidence: analysis.confidence,
    };
  });

  // 페이지네이션 계산
  const totalItems = combinedNewsAnalysis.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const startIndex = page * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // 현재 페이지의 데이터만 추출
  const paginatedNewsAnalysis = combinedNewsAnalysis.slice(startIndex, endIndex);

  return {
    newsDate: analysisData.date,
    totalNews: analysisData.totalNews,
    investmentIndex: analysisData.investmentIndex,
    summary: analysisData.summary,
    keywords: analysisData.keywords,
    newsAnalysis: paginatedNewsAnalysis,
    pagination: {
      currentPage: page,
      totalPages,
      totalItems,
      hasNext: page < totalPages - 1,
      hasPrev: page > 0,
    },
  };
};
