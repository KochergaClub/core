import { useCallback, useContext } from 'react';

import { useAPI } from '~/common/hooks';

import { getCohortParticipants, getCohortGroups } from '../../api';

import { Cohort } from '../../types';

import { MastermindContext } from './reducer';

export const useCohortParticipantsReloader = (cohort: Cohort) => {
  const api = useAPI();
  const dispatch = useContext(MastermindContext);

  return useCallback(async () => {
    const participants = await getCohortParticipants(api, cohort.id);
    dispatch({
      type: 'REPLACE_PARTICIPANTS',
      payload: {
        participants,
      },
    });
  }, [api, cohort.id]);
};

export const useCohortGroupsReloader = (cohort: Cohort) => {
  const api = useAPI();
  const dispatch = useContext(MastermindContext);

  return useCallback(async () => {
    const groups = await getCohortGroups(api, cohort.id);
    dispatch({
      type: 'REPLACE_GROUPS',
      payload: {
        groups,
      },
    });
  }, [api, cohort.id]);
};
