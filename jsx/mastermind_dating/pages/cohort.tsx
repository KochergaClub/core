import React from 'react';

import { A } from '@kocherga/frontkit';

import { Screen, InitialLoader } from '~/common/types';
import Page from '~/components/Page';

import { User } from '../types';
import { getCohortUsers } from '../api';
import UserList from '../components/UserList';

interface Props {
  cohort_id: number;
  users: User[];
}

const MastermindCohortPage: React.FC<Props> = ({ cohort_id, users }) => (
  <Page title="Аналитика мастермайнд-дейтинга" team>
    <Page.Title>Мастермайнд-дейтинг</Page.Title>
    <Page.Main>
      <section>
        <A href="/team/mastermind_dating">&larr; к списку когорт</A>
      </section>
      <h1>Когорта {cohort_id}</h1>
      <UserList users={users} />
    </Page.Main>
  </Page>
);

const getInitialData: InitialLoader<Props> = async ({ api }, { params }) => {
  const cohort_id = parseInt(params.id, 10);
  const users = await getCohortUsers(api, cohort_id);
  return {
    cohort_id,
    users,
  };
};

const screen: Screen<Props> = {
  component: MastermindCohortPage,
  getInitialData,
};

export default screen;
