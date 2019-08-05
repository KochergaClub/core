import React from 'react';
import styled from 'styled-components';

import * as df from 'date-fns';

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
  const lastDay = df.addDays(week, 6);

  let format = 'LLLL';
  if (df.getYear(lastDay) !== df.getYear(new Date())) {
    format = format + ' yyyy';
  }
  return <Container>{formatDate(lastDay, format)}</Container>;
};

export default WeekHeader;
