"use client";

import { useQuery } from "@tanstack/react-query";

import { newsListAPI } from "../apis";

export const useGetNewsList = (page: number) => {
  return useQuery({
    queryKey: ["news-list", page],
    queryFn: () => newsListAPI({ page }),
  });
};
