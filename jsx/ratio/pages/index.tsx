import React from 'react';

import { A } from '@kocherga/frontkit';

import { Screen, InitialLoader } from '~/common/types';
import Page from '~/components/Page';
import { selectAPI } from '~/core/selectors';

import { Training } from '../types';
import { getTrainings } from '../api';

interface Props {
  trainings: Training[];
  children?: React.ReactNode;
}

const RatioIndexPage = ({ trainings }: Props) => (
  <Page title="Ratio" team>
    <Page.Title>Воркшопы и тренинги</Page.Title>
    <Page.Main>
      <small>
        <A href="/admin/ratio/training/add/">Добавить тренинг</A>
      </small>
      <hr />
      <ul>
        {trainings.map(training => (
          <li key={training.slug}>
            <A href={`training/${training.slug}/`}>
              {training.date} {training.name}
            </A>
          </li>
        ))}
      </ul>
    </Page.Main>
  </Page>
);

const getInitialData: InitialLoader<Props> = async ({ getState }) => {
  const api = selectAPI(getState());

  const trainings = await getTrainings(api);
  return { trainings };
};

const screen: Screen<Props> = {
  component: RatioIndexPage,
  getInitialData,
};

export default screen;
