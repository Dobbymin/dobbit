import { Toaster } from "../components";

import { QueryProvider } from "./components";

type Props = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: Props) => {
  return (
    <QueryProvider>
      {children}
      <Toaster />
    </QueryProvider>
  );
};
