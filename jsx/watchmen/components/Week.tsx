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

class Week extends React.Component<Props> {
  static Container = styled.div`
    display: grid;
    grid-template-columns: repeat(7, 1fr);

    margin-bottom: 10px;
  `;

  static Cell = styled.div<{ today: boolean }>``;

  render() {
    const { firstDay, renderDay } = this.props;
    return (
      <Week.Container>
        {weekMoments(firstDay).map((day, i) => {
          const today = moment(day)
            .startOf('day')
            .isSame(moment().startOf('day'));
          return (
            <Week.Cell key={i} today={today}>
              <DayHeader day={day} />
              <div>{renderDay(day)}</div>
            </Week.Cell>
          );
        })}
      </Week.Container>
    );
  }
}

export default Week;
