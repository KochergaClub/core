import React, { useContext } from 'react';

import styled from 'styled-components';

import PrintContext from './PrintContext';

import { PageType } from './index';

interface ContainerProps {
  height: number;
}

const Container = styled.header<ContainerProps>`
  max-width: 800px;
  position: relative;
  break-after: page;
  height: ${props => props.height}mm;
  display: flex;
  flex-direction: column;
  @media screen {
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
    height: 100vh;
  }
`;

const MainArea = styled.div`
  flex: 1;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
  margin-left: 50px;
  margin-right: 50px;

  font-size: 4em;
  font-weight: bold;
  font-variant: small-caps;
  line-height: 1.1;
`;

const Training = styled.footer`
  width: 100%;
`;

const EventTitle = styled.div`
  text-align: center;
  color: #666;
  margin-bottom: 10px;
`;

const BrandLine = styled.div`
  display: flex;
  align-items: center;
  font-family: Intro;
  justify-content: center;
  margin-bottom: 10px;

  img {
    height: 32px;
    margin-right: 8px;
  }
`;

interface Props {
  wagtailPage: PageType;
}

export default function Frontpage(props: Props) {
  const printContext = useContext(PrintContext);
  return (
    <Container
      height={
        printContext.page.height - printContext.page.bottomMargin * 2 - 10
      }
    >
      <MainArea>
        <Header>{props.wagtailPage.title}</Header>
      </MainArea>
      <Training>
        {/* TODO - add event date line, or maybe picker of a ratio event */}
        {false && <EventTitle>Выездной воркшоп по рациональности</EventTitle>}

        <BrandLine>
          <img src="/static/logo.png" />
          <div>Кочерга</div>
        </BrandLine>
      </Training>
    </Container>
  );
}
