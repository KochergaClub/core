import React from 'react';
import styled from 'styled-components';

import moment from 'moment';

const Container = styled.header<{ today: boolean }>`
  text-align: center;
  font-weight: ${props => (props.today ? 'bold' : 'normal')};
  padding: 2px 4px;
  color: black;
  font-size: 0.8em;
`;

const DayHeader = ({ day }: { day: moment.Moment }) => {
  const today = moment(day)
    .startOf('day')
    .isSame(moment().startOf('day'));
  const format = today || day.date() === 1 ? 'D MMMM' : 'D';
  return <Container today={today}>{day.format(format)}</Container>;
};

export default DayHeader;
