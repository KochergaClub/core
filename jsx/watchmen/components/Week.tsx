import React from 'react';
import styled from 'styled-components';

import * as df from 'date-fns';

import DayHeader from './DayHeader';

const weekMoments = (firstDay: Date) =>
  [0, 1, 2, 3, 4, 5, 6].map(i => df.addDays(firstDay, i));

interface Props {
  firstDay: Date;
  renderDay: (date: Date) => React.ReactNode;
}

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);

  margin-bottom: 10px;
`;

const DayContainer = styled.div`
  position: relative;
`;

const Cell = styled.div<{ today: boolean }>``;

const LeftHighlight = styled.div`
  position: absolute;
  left: -20px;
  width: 3px;
  height: 100%;
  background-color: black;
`;

const RightHighlight = styled.div`
  position: absolute;
  right: -20px;
  width: 3px;
  height: 100%;
  background-color: black;
`;

const Week: React.FC<Props> = ({ firstDay, renderDay }) => {
  const highlight = df.isEqual(
    df.startOfWeek(firstDay),
    df.startOfWeek(new Date())
  );

  return (
    <Container>
      {weekMoments(firstDay).map((day, i) => {
        const today = df.isEqual(df.startOfDay(new Date()), df.startOfDay(day));

        return (
          <Cell key={i} today={today}>
            <DayHeader day={day} />
            <DayContainer>
              {i === 0 && highlight && <LeftHighlight />}
              {i === 6 && highlight && <RightHighlight />}
              {renderDay(day)}
            </DayContainer>
          </Cell>
        );
      })}
    </Container>
  );
};

export default Week;
