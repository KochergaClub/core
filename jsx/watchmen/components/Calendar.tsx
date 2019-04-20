import React from 'react';

import moment from 'moment';
import 'moment/locale/ru';

import MonthHeader from './MonthHeader';
import Week from './Week';
import WeekHeader from './WeekHeader';

interface Props {
  fromDate: moment.Moment;
  toDate: moment.Moment;
  renderDay: (date: moment.Moment) => React.ReactNode;
}

export default class Calendar extends React.Component<Props> {
  get weeks(): moment.Moment[] {
    // Note: startOf('week') will work correctly only if we use 'ru' locale
    let firstDay = moment(this.props.fromDate);
    if (firstDay.day() != 1) {
      firstDay.endOf('week').add(1, 'day');
    }

    const result: moment.Moment[] = [];
    const day = firstDay;
    do {
      day.startOf('week'); // bad hack - moment.js is mutable
      result.push(moment(day));
      day.add(1, 'week');
      day.endOf('week'); // bad hack
    } while (day.isSameOrBefore(this.props.toDate));

    return result;
  }

  needsHeader = (week: moment.Moment, i: number) => {
    if (i === 0) {
      return true;
    }
    const lastDay = moment(week);
    lastDay.add(6, 'day');
    if (lastDay.date() <= 7) {
      return true;
    }
    return false;
  };

  render() {
    return (
      <div style={{ minHeight: 250 }}>
        <MonthHeader />
        {this.weeks.map((week, i) => (
          <div key={week.format('D-M')}>
            {this.needsHeader(week, i) && <WeekHeader week={week} />}
            <Week firstDay={week} renderDay={this.props.renderDay} />
          </div>
        ))}
      </div>
    );
  }
}
