import { Minus, TrendingDown, TrendingUp } from "lucide-react";

export const getSentimentConfig = (sentiment: string) => {
  switch (sentiment) {
    case "positive":
      return {
        color: "text-positive",
        bg: "bg-positive/10",
        border: "border-positive/20",
        label: "호재",
        icon: <TrendingUp className='size-4' />,
      };
    case "negative":
      return {
        color: "text-negative",
        bg: "bg-negative/10",
        border: "border-negative/20",
        label: "악재",
        icon: <TrendingDown className='size-4' />,
      };
    default:
      return {
        color: "text-text-muted-dark",
        bg: "bg-text-muted-dark/10",
        border: "border-text-muted-dark/20",
        label: "중립",
        icon: <Minus className='size-4' />,
      };
  }
};
