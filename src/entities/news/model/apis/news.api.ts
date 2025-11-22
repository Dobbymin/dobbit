import { AI_NEWS_URL } from "@/shared";

import { NewsItem } from "../types";

export type NewsResponse = NewsItem[];

export const newsAPI = async () => {
  const response = await fetch(`${AI_NEWS_URL}/api/crypto-news/raw?type=news&date=latest`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch news data");
  }

  const data = await response.json();
  return data;
};
