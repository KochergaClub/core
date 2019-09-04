import React, { useState } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import Link from 'next/link';

import MenuItems from './MenuItems';
import MobileHeader from './MobileHeader';
import SocialIcons from './SocialIcons';
import MenuButton from './MenuButton';

import { teamColor } from './constants';

const Container = styled('div')<{ hideOnMobile: boolean; team: boolean }>`
  width: 100%;
  height: 60px;
  padding: 0 40px;

  background-color: ${props => (props.theme.team ? teamColor : 'black')};
  color: white;

  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 980px) {
    display: ${props => (props.hideOnMobile ? 'none' : 'flex')};
    flex-direction: column;
    height: auto;
    padding: 20px 0;
  }

  @media print {
    display: none;
  }
`;

const LogoImage = () => (
  <img src="/static/menu-logo.png" width="190" height="50" />
);

const Logo = ({ team }: Props) => {
  if (team) {
    return (
      <Link href="/team" passHref>
        <a>
          <LogoImage />
        </a>
      </Link>
    );
  }

  return (
    <a href="/">
      <LogoImage />
    </a>
  );
};

const Line = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 980px) {
    flex-direction: column;
  }
`;

const LoginButton = styled.button`
  background-color: white;
  color: black;
`;

interface Props {
  team: boolean;
}

const TildaMenu = ({ team }: Props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <ThemeProvider theme={{ team }}>
      <div>
        <MobileHeader expanded={expanded} setExpand={setExpanded} />
        <Container hideOnMobile={!expanded} team={team}>
          <Line>
            <Logo team={team} />
            <MenuItems team={team} />
          </Line>
          <SocialIcons />
          {team ? null : <MenuButton href="/my">Войти</MenuButton>}
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default TildaMenu;
