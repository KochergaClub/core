import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import MenuItems from './MenuItems';
import MobileHeader from './MobileHeader';
import SocialIcons from './SocialIcons';

import { teamColor } from './constants';

const Container = styled('div')<{ hideOnMobile: boolean, team: boolean }>`
  width: 100%;
  height: 60px;
  padding: 0 40px;

  background-color: ${props => props.theme.team ? teamColor : 'black'};
  color: white;

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 980px) {
    display: ${props => props.hideOnMobile ? 'none' : 'flex'};
    flex-direction: column;
    height: auto;
    padding: 20px 0;
  }
`;

const Logo = () => (
  <a href="/">
    <img src="https://static.tildacdn.com/272f116a-f437-4a32-b57e-679d87acf228/textlogo.png" />
  </a>
);

const Line = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 980px) {
    flex-direction: column;
  }
`;

interface Props {
  team: boolean;
}

const TildaMenu = ({ team }: Props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <ThemeProvider theme={{team}}>
      <div>
        <MobileHeader expanded={expanded} setExpand={setExpanded} />
        <Container hideOnMobile={!expanded} team={team}>
          <Line>
            <Logo />
            <MenuItems team={team} />
          </Line>
          <SocialIcons />
        </Container>
      </div>
    </ThemeProvider>
  );
}

export default TildaMenu;
