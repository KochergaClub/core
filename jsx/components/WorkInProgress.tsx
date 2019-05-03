import React from 'react';
import styled from 'styled-components';

const AlertCard = styled.div`
  margin: 40px auto;
  max-width: 660px;
  border: 1px solid hsl(40, 50%, 80%);
  background-color: hsl(40, 50%, 90%);
  padding: 20px;
  font-size: 1.3em;
  line-height: 1.5;
`;

const WorkInProgress = () => (
  <AlertCard>
    <p>Сайт kocherga.club находится в разработке.</p>
    <p>
      Возможно, вы ищете основной сайт:{' '}
      <a href="https://kocherga-club.ru">kocherga-club.ru</a>
    </p>
  </AlertCard>
);

export default WorkInProgress;
