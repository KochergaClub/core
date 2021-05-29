import styled from 'styled-components';

import { fonts, HR } from '~/frontkit';

import { ActivityFragment } from '../../queries.generated';
import EditableTrainer from './EditableTrainer';

const ActivitySection = styled.section`
  margin-bottom: 32px;

  & > time {
    font-style: italic;
    font-size: ${fonts.sizes.XL2};
  }

  & > header {
    font-size: ${fonts.sizes.XL2};
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
  font-size: ${fonts.sizes.XL2};
`;

const formatTime = (time: string) => time.substr(0, 5);

interface Props {
  activity: ActivityFragment;
}

const Activity = ({ activity }: Props) => {
  switch (activity.activity_type) {
    case 'section':
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
    case 'break':
      return (
        <ActivityBreak>
          <HR />(<time>{formatTime(activity.time)}</time> {activity.name})
          <HR />
        </ActivityBreak>
      );
    case 'bonus':
      return <ActivityBonus>Бонус. {activity.name}</ActivityBonus>;
    default:
      return <div>НЕОПОЗНАННАЯ СЕКЦИЯ</div>;
  }
};

export default Activity;
