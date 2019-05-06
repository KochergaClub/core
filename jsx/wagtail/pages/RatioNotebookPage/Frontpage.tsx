import React from 'react';

import styled from 'styled-components';

const Container = styled.div`
  max-width: 800px;
  position: relative;
  page-break-after: always;
  height: 100vh;
  @media screen {
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
  }
`;

const Header = styled.section`
  height: 90vh;
  padding-top: 30vh;
  margin-left: 100px;
  margin-right: 100px;
  font-size: 3em;
  font-weight: bold;
  line-height: 1.2;
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

  img {
    height: 32px;
    margin-right: 8px;
  }
`;

export default function Frontpage() {
  return (
    <Container>
      <Header>Прикладная рациональность: рабочая тетрадь</Header>
      <Training>
        <EventTitle>Выездной воркшоп по рациональности</EventTitle>
        <BrandLine>
          <img src="/static/logo.png" />
          <div>Кочерга</div>
        </BrandLine>
      </Training>
    </Container>
  );
}
