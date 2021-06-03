export const Card: React.FC = ({ children }) => <div>{children}</div>;

export const CardHeader: React.FC = ({ children }) => (
  <header className="bg-gray-100 border-b border-gray-200 p-3">
    {children}
  </header>
);

export const CardBody: React.FC = ({ children }) => (
  <div className="p-3 max-w-3xl mx-auto">{children}</div>
);

export const EmptyCard: React.FC = ({ children }) => (
  <div className="flex justify-center text-3xl text-gray-400 pt-32">
    {children}
  </div>
);
