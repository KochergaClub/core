import * as React from 'react';

import styled from 'styled-components';

const HeaderDiv = styled.div`
  text-align: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
  margin-bottom: 30px;
`;

const HeaderLine = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 600px) {
    flex-wrap: wrap;
  }
`;

const Logo = styled.div`
  flex: 0;
  width: 150px;
  img {
    width: 80px;
    height: 80px;
    @media (max-width: 400px) {
      width: 50px;
      height: 50px;
    }
  }
`;

const Title = styled.h1`
  flex: 1;
  white-space: nowrap;

  @media (max-width: 400px) {
    font-size: 1.5rem;
  }
`;

const HeaderNote = styled.small`
  flex: 0;
  min-width: 200px;
  @media (max-width: 600px) {
    flex: 1;
  }
  @media (max-width: 400px) {
    font-size: 0.7rem;
  }
`;

const PageHeader = () => (
  <HeaderDiv>
    <HeaderLine>
      <Logo>
        <a href="https://kocherga-club.ru">
          <img
            src="https://kocherga-club.ru/static/logo.png"
            width="80"
            height="80"
          />
        </a>
      </Logo>
      <Title>Бронь Кочерги</Title>
      <HeaderNote>
        Если у вас не получается воспользоваться формой, можно создать бронь по
        телефону <a href="tel:+7(499)350-20-42">+7(499)350-20-42</a>
      </HeaderNote>
    </HeaderLine>
  </HeaderDiv>
);

export default PageHeader;
