import React from 'react';
import styled from 'styled-components';

import moment from 'moment';

import DayHeader from './DayHeader';

const weekMoments = (firstDay: moment.Moment) =>
  [0, 1, 2, 3, 4, 5, 6].map(i => moment(firstDay).add(i, 'day'));

interface Props {
  firstDay: moment.Moment;
  renderDay: (date: moment.Moment) => React.ReactNode;
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

class Week extends React.Component<Props> {
  render() {
    const { firstDay, renderDay } = this.props;
    const highlight = moment(firstDay)
      .startOf('week')
      .isSame(moment().startOf('week'));

    return (
      <Container>
        {weekMoments(firstDay).map((day, i) => {
          const today = moment(day)
            .startOf('day')
            .isSame(moment().startOf('day'));
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
  }
}

export default Week;
