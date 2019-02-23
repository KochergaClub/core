import * as React from 'react';

import styled from 'styled-components';

const Container = styled.nav`
  padding: 10px 0;
`;

export default () => (
  <Container>
    <a href="/team/ratio">Тренинги</a>
    {' | '}
    <a href="/team/analytics">Аналитика</a>
    {' | '}
    <a href="/team/mastermind_dating">Мастермайнд</a>
    {' | '}
    <a href="/admin">Админка</a>
  </Container>
);
