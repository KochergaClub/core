import React from 'react';

import { Screen, InitialLoader } from '../common/types';
import Page from '../components/Page';
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
        <a href="/admin/ratio/training/add/">Добавить тренинг</a>
      </small>
      <hr />
      <ul>
        {trainings.map(training => (
          <li key={training.name}>
            <a href={`training/${training.name}/`}>{training.name}</a>
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
