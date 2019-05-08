import React from 'react';
import styled from 'styled-components';

import HR from './HR';

import { ActivityType } from '../../types';

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

const formatTime = (time: string) => time.substr(0, 5);

interface Props {
  activity: ActivityType;
}

const Activity = ({ activity }: Props) => {
  if (activity.activity_type == 'section') {
    return (
      <ActivitySection>
        <time>{formatTime(activity.time)}</time>
        <header>{activity.name}</header>
        {activity.trainer && <div>[{activity.trainer}]</div>}
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
  } else {
    return <div>НЕОПОЗНАННАЯ СЕКЦИЯ</div>;
  }
};

export default Activity;
