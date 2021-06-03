/* Note that this component doesn't include any padding. You'll probably have to wrap it in <ResponsivePadding> or your own padding component. */
export const ColumnsBlock: React.FC = ({ children }) => (
  <div className="grid gap-5 lg:gap-10 lg:grid-flow-col lg:auto-cols-fr xl:gap-20 max-w-screen-2xl">
    {children}
  </div>
);
