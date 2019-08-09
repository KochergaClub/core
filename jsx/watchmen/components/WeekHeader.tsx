import React from 'react';
import styled from 'styled-components';

import { addDays, getYear } from 'date-fns';

import { formatDate } from '~/common/utils';

const Container = styled.header`
  text-align: center;
  font-size: 2em;
  line-height: 2.5;
`;

interface Props {
  week: Date;
}

const WeekHeader: React.FC<Props> = ({ week }) => {
  const lastDay = addDays(week, 6);

  let format = 'LLLL';
  if (getYear(lastDay) !== getYear(new Date())) {
    format = format + ' yyyy';
  }
  return <Container>{formatDate(lastDay, format)}</Container>;
};

export default WeekHeader;
