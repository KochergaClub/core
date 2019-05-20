import React from 'react';

import { A } from '@kocherga/frontkit';

import { Screen, InitialLoader } from '~/common/types';
import Page from '~/components/Page';

import { Cohort } from './types';

const Cohorts = ({ cohorts }: { cohorts: Cohort[] }) => (
  <ul>
    {cohorts.map(cohort => (
      <li>
        <A href={`/team/mastermind_dating/cohort/${cohort.id}`}>{cohort.id}</A>
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
    <Page.Title>Мастермайнд-дейтинг</Page.Title>
    <Page.Main>
      <p>
        <small>
          <A href="/admin/mastermind_dating/cohort/">
            Редактировать когорты в админке
          </A>
        </small>
      </p>
      <Cohorts cohorts={cohorts} />
    </Page.Main>
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
