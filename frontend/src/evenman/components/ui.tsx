export const Header: React.FC = ({ children }) => (
  <header className="font-bold text-gray-500 mt-5 mb-3 py-1 border-b-2 border-gray-200">
    {children}
  </header>
);

export const IconLink: React.FC<{
  href: string;
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
}> = ({ href, onClick, children }) => (
  <a
    href={href}
    onClick={onClick}
    className="flex text-gray-400 no-underline hover:text-black"
  >
    {children}
  </a>
);

export const UserText: React.FC = ({ children }) => (
  <div className="font-mono">{children}</div>
);

export const UserSpan: React.FC = ({ children }) => (
  <span className="font-mono">{children}</span>
);

export const MutedSpan: React.FC = ({ children }) => (
  <span className="text-gray-500">{children}</span>
);

export const NumberBadge: React.FC = ({ children }) => (
  <div className="bg-primary-300 rounded-full text-xs h-4 px-1.5 flex justify-center items-center">
    {children}
  </div>
);
