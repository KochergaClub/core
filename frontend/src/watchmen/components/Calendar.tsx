import { addDays, addWeeks, format, getDate, isAfter, startOfWeek } from 'date-fns';
import React from 'react';

import { MonthHeader } from './MonthHeader';
import Week from './Week';
import { WeekHeader } from './WeekHeader';

interface Props {
  fromDate: Date;
  toDate: Date;
  renderDay: (date: Date) => React.ReactNode;
}

class Calendar extends React.Component<Props> {
  get weeks(): Date[] {
    const result: Date[] = [];

    let day = startOfWeek(this.props.fromDate, { weekStartsOn: 1 });
    do {
      result.push(day);
      day = addWeeks(day, 1);
    } while (
      !isAfter(addWeeks(day, 1), this.props.toDate) // next week is later than toDate, time to stop
    );

    return result;
  }

  needsHeader = (week: Date, i: number) => {
    if (i === 0) {
      return true;
    }
    const lastDay = addDays(week, 6);
    if (getDate(lastDay) <= 7) {
      return true;
    }
    return false;
  };

  render() {
    return (
      <div style={{ minHeight: 250 }}>
        <MonthHeader />
        {this.weeks.map((week, i) => (
          <div key={format(week, 'dd-MM')}>
            {this.needsHeader(week, i) && <WeekHeader week={week} />}
            <Week firstDay={week} renderDay={this.props.renderDay} />
          </div>
        ))}
      </div>
    );
  }
}

export default Calendar;
