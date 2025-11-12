import { Toaster } from "../components";

import { AuthProvider, QueryProvider } from "./components";

type Props = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: Props) => {
  return (
    <QueryProvider>
      <AuthProvider>{children}</AuthProvider>
      <Toaster />
    </QueryProvider>
  );
};
