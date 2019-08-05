import React from 'react';
import { connect } from 'react-redux';

import { format } from 'date-fns';

import { State } from '~/redux/store';

import { DaySchedule } from '../types';

import ShiftBox from './ShiftBox';

interface OwnProps {
  date: Date;
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
  ownProps: { date: Date }
): StateProps => {
  const key = format(ownProps.date, 'yyyy-MM-dd');
  return {
    daySchedule: state.watchmen.schedule[key] || [],
  };
};

export default connect(mapStateToProps)(DayContainer);
