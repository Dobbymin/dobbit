type Props = {
  children: React.ReactNode;
};

export default function WalletLayout({ children }: Props) {
  return <div className='my-4 flex w-full max-w-4xl justify-center px-5'>{children}</div>;
}
