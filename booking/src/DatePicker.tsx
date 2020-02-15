import * as React from 'react';

import moment from 'moment';

import 'react-dates/initialize';
import { SingleDatePicker } from 'react-dates';

interface Props {
  date: moment.Moment | null;
  changeValue: (date: moment.Moment | null) => void;
}

interface State {
  dateFocused: boolean;
}

export class DatePicker extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      dateFocused: false,
    };
  }

  modifyDate(modifier: (date: moment.Moment) => moment.Moment) {
    const date = this.props.date || moment();
    const newDate = modifier(date);
    if (this.isOutsideRange(newDate)) {
      return;
    }
    this.props.changeValue(newDate);
  }

  back = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    this.modifyDate(date => moment(date).subtract(1, 'days'));
  }

  forward = (e: React.SyntheticEvent<EventTarget>) => {
    e.preventDefault();
    this.modifyDate(date => moment(date).add(1, 'days'));
  }

  isOutsideRange = (date: moment.Moment) => {
    return !(
      moment()
        .startOf('day')
        .isBefore(date) &&
      moment()
        .add(2, 'weeks')
        .isAfter(date)
    );
  }

  render() {
    const { date, changeValue } = this.props;
    const mobile = window.innerWidth < 600;
    return (
      <div>
        <a href="#" onClick={this.back}>&larr;</a>
        {' '}
        <SingleDatePicker
          placeholder="Выберите дату"
          id="booking-date"
          date={date}
          displayFormat="dddd, D MMMM"
          onDateChange={d => changeValue(d)}
          focused={this.state.dateFocused}
          numberOfMonths={ mobile ? 1 : 2 }
          withPortal={true}
          onFocusChange={
            ({ focused }) => this.setState({ dateFocused: focused || false })
          }
          isOutsideRange={this.isOutsideRange}
        />
        {' '}
        <a href="#" onClick={this.forward}>&rarr;</a>
      </div>
    );
  }
}
