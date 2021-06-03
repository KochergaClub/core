import { parseISO } from 'date-fns';

import { formatDate } from '~/common/utils';
import { Column } from '~/frontkit';

import { ActivityFragment, TrainingDayFragment } from '../../queries.generated';
import EditDayInAdmin from '../EditDayInAdmin';
import { Activity } from './Activity';

interface Props {
  day_schedule: TrainingDayFragment;
  index: number;
  long_name: string;
}

const time2minute = (time: string): number => {
  const match = time.match(/^(\d+):(\d+)/);
  if (!match) {
    throw new Error(`Unparsable time ${time}`);
  }
  return parseInt(match[1]) * 60 + parseInt(match[2]);
};

interface PositionerProps {
  activity: ActivityFragment;
  minTime: string;
}

const Positioner: React.FC<PositionerProps> = ({
  activity,
  minTime,
  children,
}) => {
  const top = ((time2minute(activity.time) - time2minute(minTime)) * 36) / 30;

  return (
    <div className="absolute w-full" style={{ top }}>
      {children}
    </div>
  );
};

interface PositionedActivityProps {
  activity: ActivityFragment;
  minTime: string;
}

const PositionedActivity: React.FC<PositionedActivityProps> = ({
  activity,
  minTime,
}) => (
  <Positioner activity={activity} minTime={minTime}>
    <Activity activity={activity} />
  </Positioner>
);

const ActivitiesList: React.FC<Props> = ({ day_schedule }) => {
  if (!day_schedule.activities.length) {
    return null;
  }

  const minTime = day_schedule.activities[0].time;

  return (
    <>
      {day_schedule.activities.map((activity, i) => (
        <PositionedActivity key={i} activity={activity} minTime={minTime} />
      ))}
    </>
  );
};

const DaySchedule: React.FC<Props> = (props) => {
  return (
    <Column stretch gutter={24}>
      <div className="font-bold text-gray-500">
        <div className="text-xl">День {props.index}</div>
        <div>{formatDate(parseISO(props.day_schedule.date), 'd MMMM')}</div>
        <EditDayInAdmin day_schedule={props.day_schedule} />
      </div>
      <div className="relative">
        <ActivitiesList {...props} />
      </div>
    </Column>
  );
};

export default DaySchedule;
