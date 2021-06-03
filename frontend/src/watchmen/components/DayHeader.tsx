import clsx from 'clsx';
import { getDate, isEqual, startOfDay } from 'date-fns';

import { formatDate } from '~/common/utils';

interface Props {
  day: Date;
}

export const DayHeader: React.FC<Props> = ({ day }) => {
  const today = isEqual(startOfDay(day), startOfDay(new Date()));

  const format = today || getDate(day) === 1 ? 'd MMMM' : 'd';
  return (
    <header
      className={clsx('text-center text-xs px-1 py-0.5', today && 'font-bold')}
    >
      {formatDate(day, format)}
    </header>
  );
};
