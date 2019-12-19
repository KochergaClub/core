import { useSelector } from 'react-redux';

import { NextPage } from '~/common/types';
import { selectAPI } from '~/core/selectors';

import { Page } from '~/components';

import { TrainingDay } from '~/ratio/types';
import { getSchedule } from '~/ratio/api';

import { loadTrainers } from '~/ratio/features/trainers';
import { loadTraining } from '~/ratio/features/trainingItem';
import { selectTraining } from '~/ratio/features/trainingItem';

import SchedulePage from '~/ratio/schedule';

interface Props {
  schedule: TrainingDay[];
}

const RatioSchedulePage: NextPage<Props> = props => {
  const training = useSelector(selectTraining);

  if (!training) {
    throw new Error('No training');
  }

  return (
    <Page title={`Расписание | ${training.name}`} team>
      <Page.Main>
        <SchedulePage schedule={props.schedule} />
      </Page.Main>
    </Page>
  );
};

RatioSchedulePage.getInitialProps = async ({
  store: { getState, dispatch },
  query,
}) => {
  const api = selectAPI(getState());
  const slug = query.slug as string;

  await dispatch(loadTraining(slug));
  await dispatch(loadTrainers());

  const schedule = await getSchedule(api, slug);
  return {
    schedule,
  };
};

export default RatioSchedulePage;
