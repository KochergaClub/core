import React from 'react';
import styled from 'styled-components';

import { isEqual, startOfDay, getDate } from 'date-fns';

import { formatDate } from '~/common/utils';

const Container = styled.header<{ today: boolean }>`
  text-align: center;
  font-weight: ${props => (props.today ? 'bold' : 'normal')};
  padding: 2px 4px;
  color: black;
  font-size: 0.8em;
`;

interface Props {
  day: Date;
}

const DayHeader: React.FC<Props> = ({ day }) => {
  const today = isEqual(startOfDay(day), startOfDay(new Date()));

  const format = today || getDate(day) === 1 ? 'd MMMM' : 'd';
  return <Container today={today}>{formatDate(day, format)}</Container>;
};

export default DayHeader;
