import clsx from 'clsx';

interface Props {
  wide?: boolean;
}

export const Main: React.FC<Props> = ({ wide, children }) => (
  <div
    className={clsx(
      'mt-5 mb-10 mx-auto min-h-screen',
      wide ? 'max-w-screen-2xl' : 'max-w-screen-lg'
    )}
  >
    {children}
  </div>
);

export default Main;
