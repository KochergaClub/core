import styled from 'styled-components';

import { colors, Column } from '@kocherga/frontkit';

import { ActivityType, TrainingDay } from '../../types';

import EditDayInAdmin from '../EditDayInAdmin';
import Activity from './Activity';

import { formatDate } from '~/common/utils';

interface Props {
  day_schedule: TrainingDay;
  index: number;
  long_name: string;
}

const Container = styled.div`
  position: relative;
`;

const Header = styled.div`
  @font-face {
    font-family: 'Intro Book';
    src: url('/static/fonts/intro-pack/Intro-book.otf');
  }
  font-family: 'Intro Book';
  font-weight: bold;
  color: ${colors.grey[600]};
`;

const HeaderFirstLine = styled.div`
  font-size: 1.3em;
  line-height: 1.2;
`;

const time2minute = (time: string): number => {
  const match = time.match(/^(\d+):(\d+)/);
  if (!match) {
    throw new Error(`Unparsable time ${time}`);
  }
  return parseInt(match[1]) * 60 + parseInt(match[2]);
};

interface PositionerProps {
  activity: ActivityType;
  minTime: string;
}

const Positioner: React.FC<PositionerProps> = ({
  activity,
  minTime,
  children,
}) => {
  const top = ((time2minute(activity.time) - time2minute(minTime)) * 36) / 30;

  return (
    <div style={{ position: 'absolute', width: '100%', top }}>{children}</div>
  );
};

interface PositionedActivityProps {
  activity: ActivityType;
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
  if (!day_schedule.schedule.length) {
    return null;
  }

  const minTime = day_schedule.schedule[0].time;

  return (
    <>
      {day_schedule.schedule.map((activity, i) => (
        <PositionedActivity key={i} activity={activity} minTime={minTime} />
      ))}
    </>
  );
};

const DaySchedule: React.FC<Props> = props => {
  return (
    <Column stretch gutter={24}>
      <Header>
        <HeaderFirstLine>День {props.index}</HeaderFirstLine>
        <div>{formatDate(new Date(props.day_schedule.date), 'd MMMM')}</div>
        <EditDayInAdmin day_schedule={props.day_schedule} />
      </Header>
      <Container>
        <ActivitiesList {...props} />
      </Container>
    </Column>
  );
};

export default DaySchedule;
