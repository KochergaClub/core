const Unprintable: React.FC = ({ children }) => (
  <div className="print:hidden">{children}</div>
);

export default Unprintable;
