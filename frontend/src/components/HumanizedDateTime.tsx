import { utcToZonedTime } from 'date-fns-tz';

import { capitalize, formatDate, timezone } from '~/common/utils';

interface Props {
  date: Date;
}

const HumanizedDateTime: React.FC<Props> = ({ date }) => {
  const zonedDate = utcToZonedTime(date, timezone);

  return (
    <time dateTime={date.toISOString()}>
      {capitalize(formatDate(zonedDate, 'EEEE, d MMMM yyyy, HH:mm'))}
    </time>
  );
};

export default HumanizedDateTime;
