type Props = {
  pathname: string;
  href: string;
};

export const getLinkStyle = ({ pathname, href }: Props) => {
  const isActive = pathname === href;

  return `text-sm leading-normal font-medium transition-colors ${
    isActive ? "text-white" : "text-text-muted-dark hover:text-white"
  }`;
};
