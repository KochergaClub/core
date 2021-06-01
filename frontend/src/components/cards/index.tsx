import clsx from 'clsx';

import { Column, Label } from '~/frontkit';

interface CardProps {
  space?: 'default' | 'large';
  muted?: boolean;
}

export const Card: React.FC<CardProps> = ({
  space = 'default',
  muted,
  children,
}) => (
  <div
    className={clsx(
      'shadow-card rounded',
      {
        default: 'py-3 px-5',
        large: 'py-5 px-8',
      }[space],
      muted && 'text-gray-600 bg-gray-100'
    )}
  >
    {children}
  </div>
);

export const CardHeader: React.FC = ({ children }) => (
  <header>
    <strong>{children}</strong>
  </header>
);

export const CardList: React.FC = ({ children }) => (
  <Column stretch gutter={20}>
    {children}
  </Column>
);

export const CardSection: React.FC<{ title: string }> = ({
  title,
  children,
}) => {
  return (
    <section>
      <Label>{title}</Label>
      <hr className="hr mt-1 mb-4" />
      {children}
    </section>
  );
};
