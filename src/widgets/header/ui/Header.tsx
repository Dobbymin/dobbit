import { LogoButton, NavButton, UserMenuButton } from "../components";

export const Header = () => {
  return (
    <header className='h-20 w-full border-b border-solid border-white/10 bg-surface-dark/30'>
      <div className='mx-auto flex h-full w-full items-center justify-between px-6 py-3'>
        <LogoButton />
        <NavButton />
        <UserMenuButton />
      </div>
    </header>
  );
};
