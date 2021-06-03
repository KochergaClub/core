export const CalendarItemContainer: React.FC<{
  onClick?: (e: React.SyntheticEvent) => void;
}> = ({ children, onClick }) => (
  <div
    onClick={onClick}
    className="cursor-pointer flex items-center relative h-4 text-xs isolate"
  >
    {children}
  </div>
);

export const CalendarItemTitle: React.FC = ({ children }) => (
  <div className="flex-1 overflow-hidden leading-none">{children}</div>
);

export const CalendarItemIcon: React.FC = ({ children }) => (
  <div className="leading-none mx-0.5">{children}</div>
);
