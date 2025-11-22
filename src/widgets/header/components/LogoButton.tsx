import Image from "next/image";
import Link from "next/link";

import { ROUTER_PATH } from "@/shared";

import Logo from "@/shared/assets/logo.webp";

export const LogoButton = () => {
  return (
    <Link href={ROUTER_PATH.HOME} className='flex items-center gap-4'>
      <Image src={Logo} alt='Logo' width={24} height={24} />
      <h1 className='text-xl leading-tight font-bold text-white'>Dobbit</h1>
    </Link>
  );
};
