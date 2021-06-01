import clsx from 'clsx';
import { addDays, eachWeekOfInterval, isSameDay } from 'date-fns';
import React from 'react';

import { range } from '~/common/utils';

const Day: React.FC<{
  selected?: boolean;
  today?: boolean;
  onClick: () => void;
}> = ({ selected, today, onClick, children }) => (
  <div
    className={clsx(
      'w-8 text-center p-1 rounded text-sm cursor-pointer',
      today && 'font-bold',
      selected
        ? 'text-white bg-primary-500 hover:bg-primary-700'
        : 'hover:bg-gray-300'
    )}
    onClick={onClick}
  >
    {children}
  </div>
);

type Props = {
  start: Date;
  end: Date;
  selected?: Date;
  onChange: (value: Date) => void;
};

export const Calendar: React.FC<Props> = ({
  start,
  end,
  selected,
  onChange,
}) => {
  return (
    <div className="p-2">
      <div className="space-y-1">
        {eachWeekOfInterval(
          {
            start,
            end,
          },
          { weekStartsOn: 1 }
        ).map((weekStart, i) => (
          <div className="flex space-x-1" key={i}>
            {range(7).map((n) => {
              const date = addDays(weekStart, n);
              return (
                <Day
                  key={n}
                  today={isSameDay(new Date(), date)}
                  selected={selected && isSameDay(selected, date)}
                  onClick={() => onChange(date)}
                >
                  {date.getDate()}
                </Day>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};
