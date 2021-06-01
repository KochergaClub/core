import clsx from 'clsx';

interface Props {
  width?: 'small' | 'normal' | 'wide' | 'max';
}

const WIDTHS = {
  small: 'max-w-2xl', // 672px, previously 640px
  normal: 'max-w-3xl', // 768px, previously 800px
  wide: 'max-w-7xl', // 1280px, previously 1200px
  max: 'max-w-full', // 100%
};

export const PaddedBlock: React.FC<Props> = ({
  width = 'normal',
  children,
}) => (
  <div className={clsx('px-5 py-10 mx-auto', WIDTHS[width])}>{children}</div>
);
