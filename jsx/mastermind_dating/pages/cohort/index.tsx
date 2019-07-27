import React, { useReducer } from 'react';

import { Screen, InitialLoader } from '~/common/types';
import Page from '~/components/Page';

import { Cohort, User } from '../../types';
import { getCohort, getCohortUsers } from '../../api';

import Controls from './components/Controls';
import UserSection from './components/UserSection';

import { reducer, MastermindContext } from './reducer';

interface Props {
  cohort: Cohort;
  users: User[];
}

const MastermindCohortPage: React.FC<Props> = props => {
  const [store, dispatch] = useReducer(reducer, {
    cohort: props.cohort,
    users: props.users,
  });

  return (
    <MastermindContext.Provider value={dispatch}>
      <Page title={`Когорта ${store.cohort.id} | Мастермайнд-дейтинг`} team>
        <Page.Title>Мастермайнд-дейтинг. Когорта {store.cohort.id}</Page.Title>
        <Page.Main>
          <Controls cohort={store.cohort} />
          <UserSection cohort={store.cohort} users={store.users} />
          <section>
            <h1>Группы</h1>
            TODO
          </section>
        </Page.Main>
      </Page>
    </MastermindContext.Provider>
  );
};

const getInitialData: InitialLoader<Props> = async ({ api }, { params }) => {
  const cohort_id = parseInt(params.id, 10);
  const cohort = await getCohort(api, cohort_id);
  const users = await getCohortUsers(api, cohort_id);
  return {
    cohort,
    users,
  };
};

const screen: Screen<Props> = {
  component: MastermindCohortPage,
  getInitialData,
};

export default screen;
