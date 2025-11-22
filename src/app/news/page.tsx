"use client";

import { useGetNewsList } from "@/entities";
import { Badge, Button, Separator } from "@/shared";
import { ExternalLink, Minus, TrendingDown, TrendingUp } from "lucide-react";

const cleanContent = (content: string) => {
  const regex = /\[블록미디어\s+.*?\s*기자\]/;
  const match = content.match(regex);
  if (match) {
    const matchIndex = content.indexOf(match[0]);
    return content.slice(matchIndex + match[0].length).trim();
  }
  return content;
};

// 감정 상태에 따른 스타일 및 아이콘 매핑
const getSentimentConfig = (sentiment: string) => {
  switch (sentiment) {
    case "positive":
      return {
        color: "text-green-400",
        bg: "bg-green-400/10",
        border: "border-green-400/20",
        label: "호재",
        icon: <TrendingUp className='size-4' />,
      };
    case "negative":
      return {
        color: "text-red-400",
        bg: "bg-red-400/10",
        border: "border-red-400/20",
        label: "악재",
        icon: <TrendingDown className='size-4' />,
      };
    default:
      return {
        color: "text-gray-400",
        bg: "bg-gray-400/10",
        border: "border-gray-400/20",
        label: "중립",
        icon: <Minus className='size-4' />,
      };
  }
};

export default function NewsPage() {
  const { data: newsResponse, isLoading } = useGetNewsList(0);

  if (isLoading) return <div className='text-white'>데이터를 불러오는 중입니다...</div>;
  if (!newsResponse?.data) return null;

  const { newsDate, totalNews, investmentIndex, summary, keywords, newsAnalysis } = newsResponse.data;
  return (
    <div className='flex w-full max-w-4xl flex-col gap-8 px-5 py-10'>
      <h1 className='text-2xl font-bold text-white'>뉴스 목록</h1>
      <p>AI가 분석한 코인 관련 뉴스입니다.</p>
      <div className='flex w-full flex-col gap-8 pb-20'>
        <section className='rounded-xl border border-white/5 bg-surface-dark p-6 shadow-lg'>
          <header className='mb-6 flex items-center justify-between'>
            <div>
              <h2 className='text-xl font-bold text-white'>Market Briefing</h2>
              <p className='text-sm text-text-muted-dark'>
                {newsDate} 기준 • 총 {totalNews}건의 뉴스 분석
              </p>
            </div>
            <div className='text-right'>
              <p className='text-sm text-text-muted-dark'>투자 심리 지수</p>
              <div className='flex items-end justify-end gap-2'>
                <span className={`text-3xl font-bold ${investmentIndex >= 50 ? "text-green-400" : "text-red-400"}`}>
                  {investmentIndex}
                </span>
                <span className='pb-1 text-sm text-text-muted-dark'>/ 100</span>
              </div>
            </div>
          </header>

          {/* 감정 분포 바 (Progress Bar) */}
          <div className='mb-6 flex h-4 w-full overflow-hidden rounded-full bg-black/30'>
            <div
              style={{ width: `${(summary.positive / totalNews) * 100}%` }}
              className='bg-green-500 transition-all duration-500'
            />
            <div
              style={{ width: `${(summary.neutral / totalNews) * 100}%` }}
              className='bg-gray-500 transition-all duration-500'
            />
            <div
              style={{ width: `${(summary.negative / totalNews) * 100}%` }}
              className='bg-negative transition-all duration-500'
            />
          </div>
          <div className='flex justify-between text-xs text-text-muted-dark'>
            <span className='text-green-400'>긍정 {summary.positive}건</span>
            <span className='text-gray-400'>중립 {summary.neutral}건</span>
            <span className='text-negative'>부정 {summary.negative}건</span>
          </div>

          <Separator className='my-6 bg-white/10' />

          {/* 오늘의 핵심 키워드 */}
          <div>
            <p className='mb-3 text-sm font-medium text-white'>Today&apos;s Keywords</p>
            <div className='flex flex-wrap gap-2'>
              {keywords.map((k) => (
                <Badge key={k} variant='secondary' className='bg-white/5 px-3 py-1 text-gray-300 hover:bg-white/10'>
                  # {k}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* --- 3. Micro View: 개별 뉴스 카드 리스트 --- */}
        <section className='flex flex-col gap-6'>
          {newsAnalysis.map((news) => {
            const config = getSentimentConfig(news.sentiment);

            return (
              <article
                key={news.newsId}
                className='group relative overflow-hidden rounded-xl border border-white/5 bg-surface-dark transition-all hover:border-white/20'
              >
                {/* 상단: 타이틀 및 뱃지 */}
                <div className='p-6'>
                  <div className='mb-4 flex items-start justify-between gap-4'>
                    <div className='space-y-2'>
                      <div className='flex items-center gap-2'>
                        <Badge className={`${config.bg} ${config.color} gap-1 border-0 px-2 py-0.5`}>
                          {config.icon}
                          {config.label}
                        </Badge>
                        <span className='text-xs text-text-muted-dark'>AI 신뢰도 {news.confidence}%</span>
                      </div>
                      <h3 className='text-xl leading-tight font-bold text-white transition-colors group-hover:text-blue-400'>
                        {news.title}
                      </h3>
                    </div>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='shrink-0 text-text-muted-dark hover:bg-white/10 hover:text-white'
                      onClick={() => window.open(news.url, "_blank", "noopener,noreferrer")}
                    >
                      <ExternalLink className='size-5' />
                    </Button>
                  </div>

                  {/* 핵심: AI 분석 이유 (Reason) 강조 */}
                  <div className={`mb-5 rounded-lg border p-4 ${config.border} ${config.bg} bg-opacity-5`}>
                    <p
                      className='mb-1 text-xs font-bold tracking-wider uppercase opacity-70'
                      style={{ color: "inherit" }}
                    >
                      AI Insight
                    </p>
                    <p className='text-sm leading-relaxed font-medium text-white/90'>{news.reason}</p>
                  </div>

                  {/* 본문 내용 */}
                  <p className='line-clamp-4 text-sm leading-relaxed whitespace-pre-wrap text-text-muted-dark transition-all group-hover:line-clamp-none'>
                    {cleanContent(news.content)}
                  </p>
                </div>

                {/* 하단: 메타 정보 */}
                <div className='flex items-center justify-between border-t border-white/5 bg-black/20 px-6 py-3'>
                  <div className='flex gap-2'>
                    {news.keywords.map((k) => (
                      <span key={k} className='text-xs text-text-muted-dark'>
                        # {k}
                      </span>
                    ))}
                  </div>
                  <span className='text-xs font-medium text-text-muted-dark'>{news.source}</span>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    </div>
  );
}
