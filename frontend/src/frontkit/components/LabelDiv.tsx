// identical to Label, but without its cursor quirk
export const LabelDiv: React.FC = ({ children }) => (
  <div className="text-sm font-medium leading-tight text-gray-500">
    {children}
  </div>
);
