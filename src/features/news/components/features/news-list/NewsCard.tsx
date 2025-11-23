import { NewsAnalysisItem } from "@/entities";

import { getSentimentConfig } from "../../../utils";
import { ContentBox, MetaDataBox, ReasonBox, TitleBox } from "../../common";

type NewsCardProps = {
  news: NewsAnalysisItem;
  isLoading?: boolean;
};

export const NewsCard = ({ news, isLoading }: NewsCardProps) => {
  const { reason, content, title, keywords, source } = news;

  const config = getSentimentConfig(news.sentiment);

  return (
    <article className='flex flex-col gap-4 overflow-hidden bg-surface-dark p-6 transition-all hover:border-white/20'>
      <TitleBox title={title} url={news.url} confidence={news.confidence} config={config} isLoading={isLoading} />
      <ReasonBox reason={reason} config={config} isLoading={isLoading} />
      <ContentBox content={content} isLoading={isLoading} />
      <div className='-mx-6 -mb-6 border-t border-white/5 bg-black/20 px-6 py-3'>
        <MetaDataBox keywords={keywords} source={source} isLoading={isLoading} />
      </div>
    </article>
  );
};
