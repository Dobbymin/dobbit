import { Header } from "@/shared";

type Props = {
  children: React.ReactNode;
};

export const AppLayout = ({ children }: Props) => {
  return (
    <div className='flex w-full flex-col'>
      <Header />
      <main className='flex w-full justify-center'>{children}</main>
      <footer></footer>
    </div>
  );
};
