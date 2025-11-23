import { Summary } from "@/entities";
import { Separator } from "@/shared";

import { DistributionBox, KeywordBox, NewsListHeader } from "../components";

type Props = {
  newsDate: string;
  totalNews: number;
  investmentIndex: number;
  summary: Summary;
  keywords: string[];
  isLoading: boolean;
};

export const SummaryNewsSection = ({ newsDate, totalNews, investmentIndex, summary, keywords, isLoading }: Props) => {
  return (
    <section className='bg-surface-dark p-6'>
      <NewsListHeader
        newsDate={newsDate}
        totalNews={totalNews}
        investmentIndex={investmentIndex}
        isLoading={isLoading}
      />
      <DistributionBox summary={summary} totalNews={totalNews} isLoading={isLoading} />

      <Separator className='my-6 bg-text-dark/20' />

      <KeywordBox keywords={keywords} isLoading={isLoading} />
    </section>
  );
};
