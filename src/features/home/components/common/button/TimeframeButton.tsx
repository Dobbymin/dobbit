import { Button, Separator } from "@/shared";

type Props = {
  timeframe: string;
  selectedTimeframe: string;
  setSelectedTimeframe: (timeframe: string) => void;
};

export const TimeframeButton = ({ timeframe, selectedTimeframe, setSelectedTimeframe }: Props) => {
  return (
    <>
      <Button
        key={timeframe}
        variant={selectedTimeframe === timeframe ? "default" : "ghost"}
        onClick={() => setSelectedTimeframe(timeframe)}
      >
        {timeframe}
      </Button>
      {timeframe === "1시간" && <Separator orientation='vertical' className='data-[orientation=vertical]:h-4' />}
    </>
  );
};
