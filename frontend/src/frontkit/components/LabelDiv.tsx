import clsx from 'clsx';

// similar to Label, but without its cursor quirk

interface Props {
  color?: 'white';
}

export const LabelDiv: React.FC<Props> = ({ color, children }) => (
  <div
    className={clsx(
      'text-sm font-medium leading-tight',
      color === 'white' ? 'text-white' : 'text-gray-500'
    )}
  >
    {children}
  </div>
);
