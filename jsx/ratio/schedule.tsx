import React from 'react';

import styled from 'styled-components';

import Page from '../components/Page';

import Activity from './components/Activity';
import HR from './components/HR';

import { ActivityType, DayScheduleType } from './types';

const Container = styled.div`
  text-align: center;
`;

const DayFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #666;

  @media print {
    position: fixed;
    bottom: 0;
    width: 100%;
  }
`;

const DayFooterBranding = styled.div`
  display: flex;
  align-items: center;
  font-family: Intro;

  img {
    height: 32px;
    margin-right: 8px;
  }
`;

const DayContainer = styled.section`
  page-break-after: always;

  @media screen {
    margin-top: 40px;
    margin-bottom: 40px;
  }
`;

const DayHeader = styled.header`
  font-size: 32px;
  font-weight: bold;
`;

const DaySchedule = ({
  day_schedule,
  long_name,
}: {
  day_schedule: DayScheduleType;
  long_name: string;
}) => (
  <DayContainer>
    <DayHeader>День {day_schedule.day}</DayHeader>
    <HR />

    {day_schedule.activities.map(activity => <Activity activity={activity} />)}

    <DayFooter>
      <DayFooterBranding>
        <img src="/static/logo.png" />
        <div>Кочерга</div>
      </DayFooterBranding>
      <div>{long_name}</div>
    </DayFooter>
  </DayContainer>
);

const PageHeader = styled.header`
  @media print {
    display: none;
  }
`;

function groupByDay(schedule: ActivityType[]) {
  const scheduleByDay: { [key: number]: ActivityType[] } = {};
  for (const activity of schedule) {
    if (!scheduleByDay[activity.day]) {
      scheduleByDay[activity.day] = [];
    }
    scheduleByDay[activity.day].push(activity);
  }

  const days = ((Object.keys(scheduleByDay) as unknown) as number[]).sort(
    (a, b) => a - b
  );

  const result: DayScheduleType[] = [];
  for (const day of days) {
    result.push({
      day,
      activities: scheduleByDay[day],
    });
  }
  return result;
}

export default ({ name, long_name, urls, schedule }) => (
  <Page title={name} team>
    <Container>
      <PageHeader>
        <h1>
          <a href={urls.training}>{name}</a>
        </h1>
        <a href={urls.actions.change}>(Редактировать расписание)</a>
      </PageHeader>

      {groupByDay(schedule).map(day_schedule => (
        <DaySchedule
          day_schedule={day_schedule}
          long_name={long_name}
          key={day_schedule.day}
        />
      ))}
    </Container>
  </Page>
);
