import React from 'react';
import styled from 'styled-components';

import { DayScheduleType } from '../../types';

import Activity from './Activity';
import HR from './HR';

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
  text-align: center;

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

    {day_schedule.activities.map((activity, i) => (
      <Activity key={i} activity={activity} />
    ))}

    <DayFooter>
      <DayFooterBranding>
        <img src="/static/logo.png" />
        <div>Кочерга</div>
      </DayFooterBranding>
      <div>{long_name}</div>
    </DayFooter>
  </DayContainer>
);

export default DaySchedule;
