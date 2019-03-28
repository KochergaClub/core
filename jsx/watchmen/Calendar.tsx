import React from 'react';

import moment from 'moment';

import MonthHeader from './MonthHeader';
import Week from './Week';

interface Props {
  date: moment.Moment;
  renderDay: (date: moment.Moment) => React.ReactNode;
  weeks: number;
}

export default class MonthCalendar extends React.Component<Props> {
  get weeks(): moment.Moment[] {
    const firstDay = moment(this.props.date).startOf('week');

    const result = [];
    const day = firstDay;
    do {
      result.push(moment(day));
      day.add(1, 'week');
    } while (result.length < this.props.weeks);

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
