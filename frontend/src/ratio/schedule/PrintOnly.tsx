const PrintOnly: React.FC = ({ children }) => (
  <div className="hidden print:block">{children}</div>
);

export default PrintOnly;
