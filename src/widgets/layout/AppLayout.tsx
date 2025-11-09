import Image from "next/image";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage, Button } from "@/shared";
import { Bell, UserRound } from "lucide-react";

import Logo from "@/shared/assets/logo.webp";

type Props = {
  children: React.ReactNode;
};

export const AppLayout = ({ children }: Props) => {
  return (
    <div>
      <header className='flex items-center justify-between border-b border-solid border-white/10 bg-surface-dark/30 px-6 py-3 whitespace-nowrap'>
        <Link href='/' className='flex items-center gap-4'>
          <Image src={Logo} alt='Logo' width={24} height={24} />
          <h1 className='text-xl leading-tight font-bold text-white'>Dobbit</h1>
        </Link>
        <nav className='hidden flex-1 justify-center md:flex'>
          <div className='flex items-center gap-9'>
            <Link href='/' className='text-sm leading-normal font-medium text-white'>
              Dashboard
            </Link>
            <Link
              href='/auto-trade'
              className='text-sm leading-normal font-medium text-text-muted-dark hover:text-white'
            >
              Auto Trade
            </Link>
            <Link
              href='/portfolio'
              className='text-sm leading-normal font-medium text-text-muted-dark hover:text-white'
            >
              Portfolio
            </Link>
            <Link href='/settings' className='text-sm leading-normal font-medium text-text-muted-dark hover:text-white'>
              Settings
            </Link>
          </div>
        </nav>
        <div className='flex items-center justify-end gap-4'>
          <Button className='flex h-10 w-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-surface-dark text-text-muted-dark hover:bg-white/10 hover:text-white'>
            <Bell className='size-5' />
          </Button>
          <Avatar>
            <AvatarImage src={Logo.src} alt='User avatar' width={40} height={40} />
            <AvatarFallback className='bg-transparent'>
              <UserRound className='size-10' fill='#606060' />
            </AvatarFallback>
          </Avatar>
        </div>
      </header>
      <main>{children}</main>
      <footer></footer>
    </div>
  );
};
