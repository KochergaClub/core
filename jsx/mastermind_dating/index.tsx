import React from 'react';

import { Screen, InitialLoader } from '../common/types';
import Page from '../components/Page';

import { Cohort } from './types';

const Cohorts = ({ cohorts }: { cohorts: Cohort[] }) => (
  <ul>
    {cohorts.map(cohort => (
      <li>
        <a href={`/team/mastermind_dating/cohort/${cohort.id}`}>{cohort.id}</a>
      </li>
    ))}
  </ul>
);

interface Props {
  cohorts: Cohort[];
  children?: React.ReactNode;
}

const MastermindIndexPage = ({ cohorts }: Props) => (
  <Page title="Админка мастермайнд-дейтинга" team>
    <h1>Мастермайнд-дейтинг</h1>
    <p>
      <small>
        <a href="/admin/mastermind_dating/cohort/">
          Редактировать когорты в админке
        </a>
      </small>
    </p>
    <Cohorts cohorts={cohorts} />
  </Page>
);

const getInitialData: InitialLoader<Props> = async ({ api }) => {
  const cohorts = await api.call('mastermind_dating/cohort', 'GET');
  return {
    cohorts,
  };
};

const screen: Screen<Props> = {
  component: MastermindIndexPage,
  getInitialData,
};

export default screen;
