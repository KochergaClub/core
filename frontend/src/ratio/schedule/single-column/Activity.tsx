import styled from 'styled-components';

import { HR } from '@kocherga/frontkit';

import { ActivityFragment } from '../../queries.generated';
import { ActivityActivityType } from '~/apollo/gen-types';

import EditableTrainer from './EditableTrainer';

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
  activity: ActivityFragment;
}

const Activity = ({ activity }: Props) => {
  switch (activity.activity_type) {
    case ActivityActivityType.Section:
      return (
        <ActivitySection>
          <time>{formatTime(activity.time)}</time>
          <header>{activity.name}</header>
          <EditableTrainer
            trainer_name={activity.trainer?.long_name}
            picked={async () => window.alert('not implemented')}
            unpicked={async () => window.alert('not implemented')}
          />
        </ActivitySection>
      );
    case ActivityActivityType.Break:
      return (
        <ActivityBreak>
          <HR />(<time>{formatTime(activity.time)}</time> {activity.name})
          <HR />
        </ActivityBreak>
      );
    case ActivityActivityType.Bonus:
      return <ActivityBonus>Бонус. {activity.name}</ActivityBonus>;
    default:
      return <div>НЕОПОЗНАННАЯ СЕКЦИЯ</div>;
  }
};

export default Activity;
