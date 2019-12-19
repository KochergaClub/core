import React from 'react';
import { connect } from 'react-redux';

import { State } from '~/redux/store';

import { DaySchedule } from '../types';
import { selectDaySchedule } from '../features/schedule';

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
): StateProps => ({
  daySchedule: selectDaySchedule(state, ownProps.date),
});

export default connect(mapStateToProps)(DayContainer);
