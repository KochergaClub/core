import { isSameYear } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';

import { capitalize, formatDate, timezone } from '~/common/utils';

interface Props {
  date: Date;
  skipCurrentYear?: boolean;
}

const HumanizedDateTime: React.FC<Props> = ({
  date,
  skipCurrentYear = false,
}) => {
  const zonedDate = utcToZonedTime(date, timezone);

  let format = 'd MMMM yyyy, EEEE, HH:mm';
  if (skipCurrentYear) {
    if (isSameYear(date, new Date())) {
      format = 'd MMMM, EEEE, HH:mm';
    }
  }

  return (
    <time dateTime={date.toISOString()}>
      {capitalize(formatDate(zonedDate, format))}
    </time>
  );
};

export default HumanizedDateTime;
