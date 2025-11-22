"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { NAV_ITEMS } from "../config";
import { getLinkStyle } from "../utils";

export const NavButton = () => {
  const pathname = usePathname();

  const linkStyle = (href: string) => getLinkStyle({ pathname, href });

  return (
    <nav className='hidden flex-1 justify-center md:flex'>
      <div className='flex items-center gap-9'>
        {NAV_ITEMS.map((item) => (
          <Link key={item.href} href={item.href} className={linkStyle(item.href)}>
            {item.label}
          </Link>
        ))}
      </div>
    </nav>
  );
};
