"use client";

import { useGetNewsList } from "@/entities";
import { NewsListSection, SummaryNewsSection } from "@/features";

export default function NewsPage() {
  const { data: newsResponse, isLoading } = useGetNewsList(0);

  const newsData = newsResponse?.data;
  const { newsDate, totalNews, investmentIndex, summary, keywords, newsAnalysis } = newsData || {
    newsDate: "",
    totalNews: 0,
    investmentIndex: 0,
    summary: { positive: 0, negative: 0, neutral: 0 },
    keywords: [],
    newsAnalysis: [],
  };

  return (
    <div className='flex w-full max-w-4xl flex-col gap-8 px-5 py-10'>
      <h1 className='text-2xl font-bold text-white'>뉴스 목록</h1>
      <p>AI가 분석한 코인 관련 뉴스입니다.</p>
      <div className='flex w-full flex-col gap-8 pb-20'>
        <SummaryNewsSection
          newsDate={newsDate}
          totalNews={totalNews}
          investmentIndex={investmentIndex}
          summary={summary}
          keywords={keywords}
          isLoading={isLoading}
        />
        <NewsListSection newsAnalysis={newsAnalysis} isLoading={isLoading} />
      </div>
    </div>
  );
}
