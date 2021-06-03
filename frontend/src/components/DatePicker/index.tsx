import { endOfMonth, endOfWeek, startOfMonth, startOfWeek } from 'date-fns';
import React, { useEffect, useState } from 'react';

import { Calendar } from './Calendar';
import { Header } from './Header';

type Props = {
  value: Date | undefined;
  onChange: (value: Date) => void;
};

export const DatePicker: React.FC<Props> = ({ value, onChange }) => {
  // can be different if user paged through months via header buttons
  const [viewDate, setViewDate] = useState(value || new Date());

  useEffect(() => {
    setViewDate(value || new Date());
  }, [value]);

  const monthStartDate = startOfMonth(viewDate);
  const monthEndDate = endOfMonth(viewDate);
  const startDate = startOfWeek(monthStartDate, { weekStartsOn: 1 });
  const endDate = endOfWeek(monthEndDate, { weekStartsOn: 1 });

  return (
    <div className="flex">
      <div className="flex flex-col rounded border border-gray-300">
        <Header date={monthStartDate} onViewChange={setViewDate} />
        <Calendar
          start={startDate}
          end={endDate}
          selected={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};
