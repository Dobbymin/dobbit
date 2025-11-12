type Props = {
  children: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <div className='flex items-center justify-center'>
      <div className='bg-surface-dark p-8'>{children}</div>
    </div>
  );
}
