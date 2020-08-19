import styled from 'styled-components';

import { colors, Row } from '@kocherga/frontkit';

import { ButtonsListType } from './types';

const HeroButton = styled.a`
  padding: 16px 32px;
  border-radius: 100px;
  border: none;
  font-weight: bold;
  background-color: ${colors.grey[200]};
  text-decoration: none;
  color: black;
`;

interface Props {
  buttons: ButtonsListType;
}

const HeroButtons: React.FC<Props> = ({ buttons }) => (
  <Row gutter={16}>
    {buttons.map((button, i) => (
      <HeroButton href={button.link} key={i}>
        {button.title}
      </HeroButton>
    ))}
  </Row>
);

export default HeroButtons;
