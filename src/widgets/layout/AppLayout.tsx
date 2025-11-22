import { Header } from "../header";

type Props = {
  children: React.ReactNode;
};

export const AppLayout = ({ children }: Props) => {
  return (
    <div className='flex min-h-screen w-full flex-col'>
      <Header />
      <main className='flex w-full flex-1 justify-center'>{children}</main>
    </div>
  );
};
