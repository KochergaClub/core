import React, { useReducer } from 'react';

import { Screen, InitialLoader } from '~/common/types';
import Page from '~/components/Page';

import { Cohort, User, Group } from '../../types';
import { getCohort, getCohortUsers, getCohortGroups } from '../../api';

import Controls from './components/Controls';
import UserSection from './components/UserSection';
import GroupSection from './components/GroupSection';

import { reducer, MastermindContext } from './reducer';

interface Props {
  cohort: Cohort;
  users: User[];
  groups: Group[];
}

const MastermindCohortPage: React.FC<Props> = props => {
  const [store, dispatch] = useReducer(reducer, {
    cohort: props.cohort,
    users: props.users,
    groups: props.groups,
  });

  return (
    <MastermindContext.Provider value={dispatch}>
      <Page title={`Когорта ${store.cohort.id} | Мастермайнд-дейтинг`} team>
        <Page.Title>Мастермайнд-дейтинг. Когорта {store.cohort.id}</Page.Title>
        <Page.Main>
          <Controls cohort={store.cohort} />
          <UserSection cohort={store.cohort} users={store.users} />
          <GroupSection
            cohort={store.cohort}
            users={store.users}
            groups={store.groups}
          />
        </Page.Main>
      </Page>
    </MastermindContext.Provider>
  );
};

const getInitialData: InitialLoader<Props> = async ({ api }, { params }) => {
  const cohort_id = parseInt(params.id, 10);
  const cohort = await getCohort(api, cohort_id);
  const users = await getCohortUsers(api, cohort_id);
  const groups = await getCohortGroups(api, cohort_id);
  return {
    cohort,
    users,
    groups,
  };
};

const screen: Screen<Props> = {
  component: MastermindCohortPage,
  getInitialData,
};

export default screen;
