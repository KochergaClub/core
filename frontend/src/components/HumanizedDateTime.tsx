import { utcToZonedTime } from 'date-fns-tz';

import { capitalize, formatDate, timezone } from '~/common/utils';

interface Props {
  date: Date;
}

const HumanizedDateTime: React.FC<Props> = ({ date }) => {
  const zonedDate = utcToZonedTime(date, timezone);

  return (
    <time dateTime={date.toISOString()}>
      {capitalize(formatDate(zonedDate, 'd MMMM yyyy, EEEE, HH:mm'))}
    </time>
  );
};

export default HumanizedDateTime;
