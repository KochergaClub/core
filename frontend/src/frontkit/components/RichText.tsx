import clsx from 'clsx';

type Props = React.HTMLAttributes<HTMLDivElement>;

export const RichText: React.FC<Props> = ({ className, ...rest }) => (
  <div className={clsx('rich-text', className)} {...rest} />
);
