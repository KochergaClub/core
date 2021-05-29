import { addDays, getYear } from 'date-fns';

import { formatDate } from '~/common/utils';

interface Props {
  week: Date;
}

export const WeekHeader: React.FC<Props> = ({ week }) => {
  const lastDay = addDays(week, 6);

  let format = 'LLLL';
  if (getYear(lastDay) !== getYear(new Date())) {
    format = format + ' yyyy';
  }
  return (
    <div className="text-center text-3xl my-8">
      {formatDate(lastDay, format)}
    </div>
  );
};
