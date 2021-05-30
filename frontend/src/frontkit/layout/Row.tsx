import clsx from 'clsx';

interface IProps {
  gutter?: 0 | 4 | 6 | 8 | 10 | 12 | 16 | 20 | 24 | 32;
  stretch?: boolean;
  spaced?: boolean;
  centered?: boolean;
  vCentered?: boolean;
  wrap?: boolean;
}

const gutter2class = {
  0: '',
  4: 'space-x-1',
  6: 'space-x-1.5',
  8: 'space-x-2',
  10: 'space-x-2.5',
  12: 'space-x-3',
  16: 'space-x-4',
  20: 'space-x-5',
  24: 'space-x-6',
  32: 'space-x-8',
};

export const Row: React.FC<IProps> = (props) => (
  <div
    className={clsx(
      'flex',
      props.vCentered
        ? 'items-center'
        : props.stretch
        ? 'items-stretch'
        : 'items-start',
      props.spaced
        ? 'justify-between w-full'
        : props.centered
        ? 'justify-center'
        : '',
      props.wrap ? 'flex-wrap' : '',
      gutter2class[props.gutter ?? 4]
    )}
  >
    {props.children}
  </div>
);
