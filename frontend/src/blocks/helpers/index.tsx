import styled from 'styled-components';

import { colors } from '~/frontkit';

export const Container = styled.div<{ grey?: boolean }>`
  background-color: ${props => (props.grey ? colors.grey[100] : 'inherit')};

  margin: 0 auto;
  padding: 45px 0;
`;

export const TLHeader = styled.header<{ size: string }>`
  text-align: center;
  font-size: ${props => props.size};
  font-weight: 600;
  line-height: 1.3;

  @media (max-width: 640px) {
    font-size: 32px;
  }
`;

export const TLDescription = styled.div<{ large?: boolean }>`
  margin: 0 auto;
  max-width: 960px;
  padding: 0 20px;

  text-align: center;
  line-height: 1.5;

  ${props =>
    props.large &&
    `
    font-size: 24px;
    font-weight: 200;
    @media (max-width: 640px) {
      font-size: 20px;
    }
  `};
`;
