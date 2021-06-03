export const WithSidebar: React.FC<{ sidebar: React.ReactNode }> = ({
  children,
  sidebar,
}) => (
  <div className="flex h-full">
    <div className="bg-gray-100 border-r border-gray-300">{sidebar}</div>
    <div className="overflow-auto flex-1">{children}</div>
  </div>
);
