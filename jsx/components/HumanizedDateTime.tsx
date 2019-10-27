import React from 'react';

import { utcToZonedTime } from 'date-fns-tz';

import { timezone, formatDate } from '~/common/utils';

interface Props {
  date: Date;
}

const HumanizedDateTime: React.FC<Props> = ({ date }) => {
  const zonedDate = utcToZonedTime(date, timezone);

  return (
    <time dateTime={date.toISOString()}>
      {formatDate(zonedDate, 'EEEE, d MMMM, HH:mm')}
    </time>
  );
};

export default HumanizedDateTime;
