import clsx from 'clsx';
import { addDays, isEqual, startOfWeek } from 'date-fns';

import { DayHeader } from './DayHeader';

const weekDays = (firstDay: Date) =>
  [0, 1, 2, 3, 4, 5, 6].map((i) => addDays(firstDay, i));

interface Props {
  firstDay: Date;
  renderDay: (date: Date) => React.ReactNode;
}

const Highlight: React.FC<{ className: string }> = ({ className }) => (
  <div
    className={clsx('absolute border-2 border-gray-600 h-full', className)}
  />
);

const Week: React.FC<Props> = ({ firstDay, renderDay }) => {
  const highlight = isEqual(
    startOfWeek(firstDay, { weekStartsOn: 1 }),
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );

  return (
    <div className="grid grid-cols-7 mb-3">
      {weekDays(firstDay).map((day, i) => {
        return (
          <div key={i}>
            <DayHeader day={day} />
            <div className="relative">
              {i === 0 && highlight && <Highlight className="-left-5" />}
              {i === 6 && highlight && <Highlight className="-right-5" />}
              {renderDay(day)}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Week;
