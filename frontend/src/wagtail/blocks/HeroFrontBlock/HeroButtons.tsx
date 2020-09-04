import styled from 'styled-components';

import { colors, deviceMediaQueries, Row } from '@kocherga/frontkit';

import { ButtonsListType } from './types';

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  & > * + * {
    margin-left: 16px;
  }
  ${deviceMediaQueries.mobile(`
    flex-direction: column;
      align-items: start;
    & > * + * {
      margin-left: 0;
      margin-top: 16px;
    }
  `)}
`;

const HeroButton = styled.a`
  padding: 16px 60px;
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
  <ButtonsContainer>
    {buttons.map((button, i) => (
      <HeroButton href={button.link} key={i}>
        {button.title}
      </HeroButton>
    ))}
  </ButtonsContainer>
);

export default HeroButtons;
