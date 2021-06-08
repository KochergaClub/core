interface Props {
  title: string;
}

export const FooterGroup: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="flex-1">
      <header className="uppercase text-gray-500 tracking-wider mb-2 font-bold">
        {title}
      </header>
      {children}
    </div>
  );
};
