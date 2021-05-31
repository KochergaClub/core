import clsx from 'clsx';

interface Props {
  tall?: boolean;
}

export const PageTitle: React.FC<Props> = ({ tall, children }) => (
  <h1
    className={clsx(
      'w-full text-center m-0 bg-gray-100 px-5',
      tall ? 'py-16' : 'py-6'
    )}
  >
    {children}
  </h1>
);
