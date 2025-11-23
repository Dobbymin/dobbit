import { z } from "zod";

// Sentiment enum
export const SentimentSchema = z.enum(["positive", "negative", "neutral"]);

// Summary schema
export const SummarySchema = z.object({
  positive: z.number(),
  negative: z.number(),
  neutral: z.number(),
});

// NewsItem schema
export const NewsItemSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  url: z.string(),
  publishedAt: z.string(),
  source: z.string(),
  scrapedAt: z.string(),
});

// NewsAnalysisData schema
export const NewsAnalysisDataSchema = z.object({
  newsId: z.number(),
  reason: z.string(),
  keywords: z.array(z.string()),
  sentiment: SentimentSchema,
  confidence: z.number(),
});

// AnalysisItem schema
export const AnalysisItemSchema = z.object({
  date: z.string(),
  totalNews: z.number(),
  investmentIndex: z.number(),
  summary: SummarySchema,
  keywords: z.array(z.string()),
  newsAnalysis: z.array(NewsAnalysisDataSchema),
});

// API Response schemas
export const NewsAPIResponseSchema = z.object({
  success: z.boolean(),
  data: z.array(NewsItemSchema),
});

export const AnalysisAPIResponseSchema = z.object({
  success: z.boolean(),
  data: AnalysisItemSchema,
});

// Type inference from schemas
export type NewsItemSchemaType = z.infer<typeof NewsItemSchema>;
export type AnalysisItemSchemaType = z.infer<typeof AnalysisItemSchema>;
export type NewsAPIResponseSchemaType = z.infer<typeof NewsAPIResponseSchema>;
export type AnalysisAPIResponseSchemaType = z.infer<typeof AnalysisAPIResponseSchema>;
