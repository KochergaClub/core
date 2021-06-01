export const ParentLinkInHeader: React.FC<{ href: string }> = ({
  href,
  children,
}) => (
  <a
    href={href}
    className="uppercase text-xs font-bold tracking-wider text-black no-underline"
  >
    {children}
  </a>
);
