import React from 'react';
import { useSelector } from 'react-redux';

import { NextPage } from '~/common/types';
import { selectAPI } from '~/core/selectors';

import Page from '~/components/Page';

import { TrainingDay } from '~/ratio/types';
import { getSchedule } from '~/ratio/api';
import { loadTrainingBySlug, loadTrainers } from '~/ratio/actions';
import { selectViewingTraining } from '~/ratio/selectors';

import SchedulePage from '~/ratio/schedule';

interface Props {
  schedule: TrainingDay[];
}

const RatioSchedulePage: NextPage<Props> = props => {
  const training = useSelector(selectViewingTraining);

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

  await dispatch(loadTrainingBySlug(slug));
  await dispatch(loadTrainers());

  const schedule = await getSchedule(api, slug);
  return {
    schedule,
  };
};

export default RatioSchedulePage;
