import { unstable_cache } from "next/cache";

import {
  AnalysisAPIResponseSchema,
  NewsAPIResponseSchema,
  NewsAnalysisData,
  NewsAnalysisItem,
  PaginatedNewsResponse,
  analysisAPI,
  newsAPI,
} from "../model";

const ITEMS_PER_PAGE = 5;
const REVALIDATE_TIME = 300; // 5분 (초 단위)

const getMergedNewsData = unstable_cache(
  async () => {
    // 두 API를 병렬로 호출
    const [newsResponse, analysisResponse] = await Promise.all([newsAPI(), analysisAPI()]);

    // Zod를 사용한 API 응답 검증
    const validatedNewsResponse = NewsAPIResponseSchema.parse(newsResponse);
    const validatedAnalysisResponse = AnalysisAPIResponseSchema.parse(analysisResponse);

    if (!validatedNewsResponse.success || !validatedAnalysisResponse.success) {
      throw new Error("Failed to fetch news data");
    }

    const newsData = validatedNewsResponse.data;
    const analysisData = validatedAnalysisResponse.data;

    // newsId를 기준으로 analysis 데이터를 Map으로 변환 (빠른 조회를 위해)
    const analysisMap = new Map<number, NewsAnalysisData>(analysisData.newsAnalysis.map((item) => [item.newsId, item]));

    // newsData와 analysisData.newsAnalysis를 newsId 기준으로 매칭
    const combinedNewsAnalysis: NewsAnalysisItem[] = newsData.map((news) => {
      const analysis: NewsAnalysisData = analysisMap.get(news.id) || {
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

    // 전체 데이터 반환 (페이지네이션 되지 않음)
    return {
      meta: {
        newsDate: analysisData.date,
        totalNews: analysisData.totalNews,
        investmentIndex: analysisData.investmentIndex,
        summary: analysisData.summary,
        keywords: analysisData.keywords,
      },
      items: combinedNewsAnalysis,
    };
  },
  ["combined-news-data"],
  { revalidate: REVALIDATE_TIME, tags: ["news"] },
);

export const newsPaginationHandler = async (page: number = 0): Promise<PaginatedNewsResponse> => {
  try {
    // 캐시된 전체 데이터를 가져옴 (API 호출 X, 메모리/파일시스템에서 로드 O)
    const cachedData = await getMergedNewsData();

    const { items, meta } = cachedData;

    // 페이지네이션 계산
    const totalItems = items.length;
    const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
    const startIndex = page * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;

    // 현재 페이지의 데이터만 추출
    const paginatedNewsAnalysis = items.slice(startIndex, endIndex);

    return {
      newsDate: meta.newsDate,
      totalNews: meta.totalNews,
      investmentIndex: meta.investmentIndex,
      summary: meta.summary,
      keywords: meta.keywords,
      newsAnalysis: paginatedNewsAnalysis,
      pagination: {
        currentPage: page,
        totalPages,
        totalItems,
        hasNext: page < totalPages - 1,
        hasPrev: page > 0,
      },
    };
  } catch (error) {
    if (error instanceof Error) {
      console.error("News pagination handler error:", error.message);
      throw new Error(`Failed to process news data: ${error.message}`);
    }
    throw new Error("Failed to process news data: Unknown error");
  }
};
