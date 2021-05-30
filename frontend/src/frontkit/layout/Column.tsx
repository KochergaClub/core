import clsx from 'clsx';

interface Props {
  gutter?: 0 | 2 | 4 | 8 | 10 | 12 | 16 | 20 | 24 | 32 | 40;
  stretch?: boolean;
  spaced?: boolean;
  centered?: boolean;
}

const gutter2class = {
  0: '',
  2: 'space-y-0.5',
  4: 'space-y-1',
  8: 'space-y-2',
  10: 'space-y-2.5',
  12: 'space-y-3',
  16: 'space-y-4',
  20: 'space-y-5',
  24: 'space-y-6',
  32: 'space-y-8',
  40: 'space-y-10',
};

export const Column: React.FC<Props> = (props) => (
  <div
    className={clsx(
      'flex flex-col',
      props.centered
        ? 'items-center'
        : props.stretch
        ? 'items-stretch'
        : 'items-start',
      props.spaced ? 'justify-between h-full' : '',
      gutter2class[props.gutter ?? 4]
    )}
  >
    {props.children}
  </div>
);
