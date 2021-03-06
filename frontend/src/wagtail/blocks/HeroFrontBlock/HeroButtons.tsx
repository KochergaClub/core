import styled from 'styled-components';

import { colors, deviceMediaQueries } from '~/frontkit';

import { ButtonsListType } from './types';

const mobileStyles = `
    flex-direction: column;
      align-items: center;
    & > * + * {
      margin-left: 0;
      margin-top: 16px;
    }
  `;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  & > * + * {
    margin-left: 16px;
  }
  ${deviceMediaQueries.mobile(mobileStyles)}
  ${deviceMediaQueries.tablet(mobileStyles)}
`;

const HeroButton = styled.a<{ highlight: boolean }>`
  padding: 16px 60px;
  border-radius: 100px;
  border: none;
  font-weight: bold;
  text-align: center;
  background-color: ${(props) =>
    props.highlight ? colors.accent[700] : colors.grey[200]};
  text-decoration: none;
  color: ${(props) => (props.highlight ? 'white' : 'black')};
`;

interface Props {
  buttons: ButtonsListType;
}

const HeroButtons: React.FC<Props> = ({ buttons }) => (
  <ButtonsContainer>
    {buttons.map((button, i) => (
      <HeroButton href={button.link} highlight={button.highlight} key={i}>
        {button.title}
      </HeroButton>
    ))}
  </ButtonsContainer>
);

export default HeroButtons;
