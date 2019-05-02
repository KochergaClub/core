import React from 'react';

import { Screen, InitialLoader } from '../common/types';
import Page from '../components/Page';
import { Training } from './types';

interface Props {
  trainings: Training[];
}

const RatioIndexPage = ({ trainings }: Props) => (
  <Page title="Ratio" team>
    <h1>Воркшопы и тренинги</h1>
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
  </Page>
);

const getInitialData: InitialLoader = async ({ api }) => {
  const trainings = await api.call('ratio/training', 'GET');
  return { trainings };
};

const screen: Screen = {
  component: RatioIndexPage,
  getInitialData,
};

export default screen;
