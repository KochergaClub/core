import React, { useReducer } from 'react';

import { Screen, InitialLoader } from '~/common/types';
import Page from '~/components/Page';

import { Cohort, User } from '../../types';
import { getCohort, getCohortUsers } from '../../api';

import Controls from './components/Controls';
import UserList from './components/UserList';
import CreateUserButton from './components/CreateUserButton';

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
        <Page.Title>Мастермайнд-дейтинг</Page.Title>
        <Page.Main>
          <Controls cohort={store.cohort} />
          <h1>Когорта {store.cohort.id}</h1>
          <UserList users={store.users} />
          <CreateUserButton cohort={store.cohort} />
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
