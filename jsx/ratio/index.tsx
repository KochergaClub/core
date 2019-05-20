import React from 'react';

import { A } from '@kocherga/frontkit';

import { Screen, InitialLoader } from '~/common/types';
import Page from '~/components/Page';

import { Training } from './types';

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
          <li key={training.name}>
            <A href={`training/${training.name}/`}>{training.name}</A>
          </li>
        ))}
      </ul>
    </Page.Main>
  </Page>
);

const getInitialData: InitialLoader<Props> = async ({ api }) => {
  const trainings = await api.call('ratio/training', 'GET');
  return { trainings };
};

const screen: Screen<Props> = {
  component: RatioIndexPage,
  getInitialData,
};

export default screen;
