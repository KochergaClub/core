import React from 'react';
import styled from 'styled-components';

import { ActivityType, DayScheduleType } from '../../types';

import Activity from './Activity';

interface Props {
  day_schedule: DayScheduleType;
  long_name: string;
}

const Container = styled.div`
  position: relative;
  height: 1400px;
`;

const Header = styled.div`
  @font-face {
    font-family: 'Intro Light';
    src: url('/static/fonts/intro-pack/Intro-Light.otf');
  }
  font-family: 'Intro Light';
  font-size: 1.3em;
`;

const time2minute = (time: string) => {
  const match = time.match(/^(\d+):(\d+)/);
  if (!match) {
    throw new Error(`Unparsable time ${time}`);
  }
  return parseInt(match[1]) * 60 + parseInt(match[2]);
};

const Positioner = ({
  activity,
  children,
}: {
  activity: ActivityType;
  children: React.ReactNode;
}) => {
  const minTime = '09:00';
  const maxTime = '23:59';
  const height = 1000;
  const top =
    ((time2minute(activity.time) - time2minute(minTime)) /
      (time2minute(maxTime) - time2minute(minTime))) *
    height;

  return (
    <div style={{ position: 'absolute', width: '100%', top }}>{children}</div>
  );
};

const PositionedActivity = ({ activity }: { activity: ActivityType }) => (
  <Positioner activity={activity}>
    <Activity activity={activity} />
  </Positioner>
);

export default function DaySchedule({ day_schedule }: Props) {
  return (
    <div>
      <Header>День {day_schedule.day}</Header>
      <Container>
        {day_schedule.activities.map((activity, i) => (
          <PositionedActivity key={i} activity={activity} />
        ))}
      </Container>
    </div>
  );
}