import { Button } from "@/shared";
import { ChevronDown } from "lucide-react";

type Props = {
  children: React.ReactNode;
};

export const ChartOptionButton = ({ children }: Props) => {
  return (
    <Button variant='ghost'>
      <span>{children}</span>
      <ChevronDown className='size-4' />
    </Button>
  );
};
