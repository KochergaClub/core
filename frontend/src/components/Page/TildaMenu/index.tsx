import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';

import Link from 'next/link';

import { staticUrl } from '~/common/utils';

import MenuItems from './MenuItems';
import MobileHeader from './MobileHeader';

import { styled, kind2color } from './constants';
import { MenuKind } from '../types';
import UserButtons from './UserButtons';
import Search from '../Search';

const Container = styled.div<{ hideOnMobile: boolean }>`
  width: 100%;
  height: 60px;
  padding: 0 40px;

  background-color: ${props => kind2color[props.theme.kind]};

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
  <img src={staticUrl('menu-logo.png')} width="190" height="50" />
);

const Logo = ({ kind }: Props) => {
  if (kind === 'team') {
    return (
      <Link href="/team" passHref>
        <a>
          <LogoImage />
        </a>
      </Link>
    );
  }

  return (
    <Link href="/" as="/" passHref>
      <a>
        <LogoImage />
      </a>
    </Link>
  );
};

const Line = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: 980px) {
    flex-direction: column;
    margin-bottom: 20px;
  }
`;

const MaybePaddedSearch = styled.div`
  margin-left: 16px;
  @media screen and (max-width: 980px) {
    margin-left: 0;
  }
`;

interface Props {
  kind: MenuKind;
}

const TildaMenu = ({ kind }: Props) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <ThemeProvider theme={{ kind }}>
      <div>
        <MobileHeader expanded={expanded} setExpand={setExpanded} />
        <Container hideOnMobile={!expanded}>
          <Line>
            <Logo kind={kind} />
            <MenuItems kind={kind} />
            <MaybePaddedSearch>
              <Search />
            </MaybePaddedSearch>
          </Line>
          <UserButtons kind={kind} />
        </Container>
      </div>
    </ThemeProvider>
  );
};

export default React.memo(TildaMenu);
