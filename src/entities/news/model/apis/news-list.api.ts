import { APIResponse } from "@/shared";

import { PaginatedNewsResponse } from "../types";

export type NewsListParams = {
  page?: number;
};

export type NewsListResponse = APIResponse<PaginatedNewsResponse>;

export const newsListAPI = async ({ page = 0 }: NewsListParams): Promise<NewsListResponse> => {
  const response = await fetch(`/api/news?page=${page}`);

  if (!response.ok) {
    throw new Error("Failed to fetch news list");
  }

  return response.json();
};
