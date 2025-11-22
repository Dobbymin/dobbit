import Image from "next/image";
import Link from "next/link";

import Logo from "@/shared/assets/logo.webp";

import { ROUTER_PATH } from "../../../constants";
import { LoginButton } from "../../common";

export const Header = () => {
  return (
    <header className='h-20 w-full border-b border-solid border-white/10 bg-surface-dark/30'>
      <div className='mx-auto flex h-full w-full items-center justify-between px-6 py-3'>
        <Link href={ROUTER_PATH.HOME} className='flex items-center gap-4'>
          <Image src={Logo} alt='Logo' width={24} height={24} />
          <h1 className='text-xl leading-tight font-bold text-white'>Dobbit</h1>
        </Link>
        <nav className='hidden flex-1 justify-center md:flex'>
          <div className='flex items-center gap-9'>
            <Link href={ROUTER_PATH.HOME} className='text-sm leading-normal font-medium text-white'>
              Dashboard
            </Link>
            <Link
              href={ROUTER_PATH.AUTO_TRADE}
              className='text-sm leading-normal font-medium text-text-muted-dark hover:text-white'
            >
              Auto Trade
            </Link>
            <Link
              href={ROUTER_PATH.PORTFOLIO}
              className='text-sm leading-normal font-medium text-text-muted-dark hover:text-white'
            >
              Portfolio
            </Link>
            <Link
              href={ROUTER_PATH.SETTING}
              className='text-sm leading-normal font-medium text-text-muted-dark hover:text-white'
            >
              Setting
            </Link>
          </div>
        </nav>
        <LoginButton />
      </div>
    </header>
  );
};
