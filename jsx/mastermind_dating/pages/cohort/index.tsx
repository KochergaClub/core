import React, { useReducer } from 'react';

import { Screen, InitialLoader } from '~/common/types';
import Page from '~/components/Page';

import { Cohort, Participant, Group } from '../../types';
import { getCohort, getCohortParticipants, getCohortGroups } from '../../api';

import Controls from './components/Controls';
import ParticipantSection from './components/ParticipantSection';
import GroupSection from './components/GroupSection';

import { reducer, MastermindContext } from './reducer';

interface Props {
  cohort: Cohort;
  participants: Participant[];
  groups: Group[];
}

const MastermindCohortPage: React.FC<Props> = props => {
  const [store, dispatch] = useReducer(reducer, {
    cohort: props.cohort,
    participants: props.participants,
    groups: props.groups,
  });

  return (
    <MastermindContext.Provider value={dispatch}>
      <Page title={`Когорта ${store.cohort.id} | Мастермайнд-дейтинг`} team>
        <Page.Title>Мастермайнд-дейтинг. Когорта {store.cohort.id}</Page.Title>
        <Page.Main>
          <Controls cohort={store.cohort} />
          <ParticipantSection
            cohort={store.cohort}
            participants={store.participants}
          />
          <GroupSection
            cohort={store.cohort}
            participants={store.participants}
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
  const participants = await getCohortParticipants(api, cohort_id);
  const groups = await getCohortGroups(api, cohort_id);
  return {
    cohort,
    participants,
    groups,
  };
};

const screen: Screen<Props> = {
  component: MastermindCohortPage,
  getInitialData,
};

export default screen;
