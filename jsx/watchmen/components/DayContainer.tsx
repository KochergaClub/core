import React from 'react';
import { connect } from 'react-redux';

import moment from 'moment';

import { State } from '~/redux/store';

import { DaySchedule } from '../types';

import ShiftBox from './ShiftBox';

interface OwnProps {
  date: moment.Moment;
}

interface StateProps {
  daySchedule: DaySchedule;
}

type Props = OwnProps & StateProps;

const DayContainer: React.FC<Props> = ({ daySchedule }) => {
  return (
    <div>
      {daySchedule.map(shift => (
        <ShiftBox key={shift.shift} shift={shift} />
      ))}
    </div>
  );
};

const mapStateToProps = (
  state: State,
  ownProps: { date: moment.Moment }
): StateProps => ({
  daySchedule: state.watchmen.schedule
    ? state.watchmen.schedule[ownProps.date.format('YYYY-MM-DD')]
    : [],
});

export default connect(mapStateToProps)(DayContainer);
