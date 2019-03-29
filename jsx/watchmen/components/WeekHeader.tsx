import * as React from 'react';
import styled from 'styled-components';

import moment from 'moment';

const Container = styled.header`
  text-align: center;
  font-size: 2em;
  line-height: 2.5;
`;

const WeekHeader = ({ week }: { week: moment.Moment }) => {
  const lastDay = moment(week);
  lastDay.add(6, 'day');

  let format = 'MMMM';
  if (lastDay.year() !== moment().year()) {
    format = format + ' YYYY';
  }
  return <Container>{lastDay.format(format)}</Container>;
};

export default WeekHeader;
