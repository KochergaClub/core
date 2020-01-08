import { useReducer } from 'react';

import { NextPage } from '~/common/types';
import Page from '~/components/Page';
import { selectAPI } from '~/core/selectors';

import { Cohort, Participant, Group } from '~/mastermind_dating/types';
import {
  getCohort,
  getCohortParticipants,
  getCohortGroups,
} from '~/mastermind_dating/api';

import Controls from '~/mastermind_dating/pages/cohort/components/Controls';
import ParticipantSection from '~/mastermind_dating/pages/cohort/components/ParticipantSection';
import GroupSection from '~/mastermind_dating/pages/cohort/components/GroupSection';

import {
  reducer,
  MastermindContext,
} from '~/mastermind_dating/pages/cohort/reducer';

interface Props {
  cohort: Cohort;
  participants: Participant[];
  groups: Group[];
}

const MastermindCohortPage: NextPage<Props> = props => {
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

MastermindCohortPage.getInitialProps = async ({
  store: { getState },
  query,
}) => {
  const api = selectAPI(getState());

  const cohort_id = parseInt(query.id as string, 10);
  const cohort = await getCohort(api, cohort_id);
  const participants = await getCohortParticipants(api, cohort_id);
  const groups = await getCohortGroups(api, cohort_id);
  return {
    cohort,
    participants,
    groups,
  };
};

export default MastermindCohortPage;
