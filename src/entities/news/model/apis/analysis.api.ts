import { AI_NEWS_URL } from "@/shared";

import { AnalysisItem } from "../types";

export type analysisResponse = AnalysisItem;

export const analysisAPI = async () => {
  const response = await fetch(`${AI_NEWS_URL}/api/crypto-news/raw?type=analysis&date=latest`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch analysis data");
  }

  const data = await response.json();
  return data;
};
