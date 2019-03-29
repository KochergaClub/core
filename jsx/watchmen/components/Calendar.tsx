import React from 'react';

import moment from 'moment';
import 'moment/locale/ru';

import MonthHeader from './MonthHeader';
import Week from './Week';

interface Props {
  fromDate: moment.Moment;
  toDate: moment.Moment;
  renderDay: (date: moment.Moment) => React.ReactNode;
}

export default class MonthCalendar extends React.Component<Props> {
  get weeks(): moment.Moment[] {
    // Note: startOf('week') will work correctly only if we use 'ru' locale
    let firstDay = moment(this.props.fromDate);
    if (firstDay.day() != 1) {
      firstDay.endOf('week').add(1, 'day');
    }

    const result = [];
    const day = firstDay;
    do {
      day.startOf('week'); // bad hack - moment.js is mutable
      result.push(moment(day));
      day.add(1, 'week');
      day.endOf('week'); // bad hack
    } while (day.isSameOrBefore(this.props.toDate));

    return result;
  }

  render() {
    return (
      <div style={{ minHeight: 250 }}>
        <MonthHeader />
        {this.weeks.map(week => (
          <Week
            key={week.format('D-M')}
            firstDay={week}
            renderDay={this.props.renderDay}
          />
        ))}
      </div>
    );
  }
}
