import { NewsAnalysisItem } from "@/entities";

import { NewsCard } from "../components";

type Props = {
  newsAnalysis: NewsAnalysisItem[];
  isLoading?: boolean;
};

export const NewsListSection = ({ newsAnalysis, isLoading }: Props) => {
  if (isLoading) {
    return (
      <section className='flex flex-col gap-6'>
        {Array.from({ length: 5 }).map((_, index) => (
          <NewsCard
            key={index}
            news={{
              newsId: index,
              title: "",
              content: "",
              url: "",
              source: "",
              reason: "",
              keywords: [],
              sentiment: "neutral",
              confidence: 0,
            }}
            isLoading
          />
        ))}
      </section>
    );
  }

  return (
    <section className='flex flex-col gap-6'>
      {newsAnalysis.map((news) => (
        <NewsCard key={news.newsId} news={news} />
      ))}
    </section>
  );
};
