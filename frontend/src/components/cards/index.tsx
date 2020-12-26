import styled from 'styled-components';

import { colors, Column, Label } from '~/frontkit';

export const Card = styled.div`
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  border-radius: 4px;
  padding: 12px 20px;
`;

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

const SectionHr = styled.hr`
  border: 0;
  width: 100%;
  background: ${colors.grey[200]};

  margin-top: 4px;
  margin-bottom: 16px;
  height: 1px;
`;

export const CardSection: React.FC<{ title: string }> = ({
  title,
  children,
}) => {
  return (
    <section>
      <Label>{title}</Label>
      <SectionHr />
      {children}
    </section>
  );
};
