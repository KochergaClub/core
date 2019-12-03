import { useCallback, useContext } from 'react';
import styled from 'styled-components';

import { HR } from '@kocherga/frontkit';

import { useAPI } from '~/common/hooks';

import { ActivityType, Trainer } from '../../types';
import { setTrainerForActivity, unsetTrainerForActivity } from '../../api';

import { ScheduleContext } from '../utils';

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
  activity: ActivityType;
}

const Activity = ({ activity }: Props) => {
  const { dispatch } = useContext(ScheduleContext);

  const api = useAPI();

  const setTrainer = useCallback(
    async (trainer: Trainer) => {
      await setTrainerForActivity(api, activity.id, trainer.long_name);
      dispatch({
        type: 'SET_TRAINER',
        payload: {
          activity_id: activity.id,
          trainer: trainer.long_name,
        },
      });
    },
    [dispatch, api, activity.id]
  );

  const unsetTrainer = useCallback(async () => {
    await unsetTrainerForActivity(api, activity.id);
    dispatch({
      type: 'UNSET_TRAINER',
      payload: {
        activity_id: activity.id,
      },
    });
  }, [dispatch, api, activity.id]);

  if (activity.activity_type == 'section') {
    return (
      <ActivitySection>
        <time>{formatTime(activity.time)}</time>
        <header>{activity.name}</header>
        <EditableTrainer
          trainer_name={activity.trainer}
          picked={setTrainer}
          unpicked={unsetTrainer}
        />
      </ActivitySection>
    );
  } else if (activity.activity_type == 'break') {
    return (
      <ActivityBreak>
        <HR />(<time>{formatTime(activity.time)}</time> {activity.name})
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
