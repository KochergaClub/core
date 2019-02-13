import React from 'react';

import styled from 'styled-components';

import Page from '../components/Page';

const Container = styled.div`
  text-align: center;
`;

const HR = styled.hr`
  margin: 32px 0;
  height: 1px;
  border: 0;
  border-top: 1px solid #ddd;
`;

const ActivitySection = styled.section`
  margin-bottom: 32px;

  & > time {
    font-style: italic;
    font-size: 24px;
  }

  & > header {
    font-size: 24px;
    font-weight: 600;
    margin: 8px 0;
  }
`;

const ActivityBreak = styled.section`
  font-style: italic;
  color: #666;
  margin-top: 32px;
  margin-bottom: 32px;
`;

const ActivityBonus = styled.section`
  font-size: 24px;
`;

const formatTime = time => time.substr(0, 5);

const Activity = ({ activity }) => {
  if (activity.activity_type == 'section') {
    return (
      <ActivitySection>
        <time>{formatTime(activity.time)}</time>
        <header>{activity.name}</header>
        <div>[{activity.trainer}]</div>
      </ActivitySection>
    );
  } else if (activity.activity_type == 'break') {
    return (
      <ActivityBreak>
        <HR />
        (<time>{formatTime(activity.time)}</time> {activity.name})
        <HR />
      </ActivityBreak>
    );
  } else if (activity.activity_type == 'bonus') {
    return <ActivityBonus>Бонус. {activity.name}</ActivityBonus>;
  }
};

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

const DaySchedule = ({ day_schedule, long_name }) => (
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

function groupByDay(schedule) {
  const scheduleByDay = {};
  for (const activity of schedule) {
    if (!scheduleByDay[activity.day]) {
      scheduleByDay[activity.day] = [];
    }
    scheduleByDay[activity.day].push(activity);
  }

  const days = Object.keys(scheduleByDay).sort((a, b) => a - b);

  const result = [];
  for (const day of days) {
    result.push({
      day,
      activities: scheduleByDay[day],
    });
  }
  return result;
}

export default ({ name, long_name, urls, schedule }) => (
  <Page title={name}>
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
