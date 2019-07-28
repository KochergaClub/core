import { useCallback, useContext } from 'react';

import { useAPI } from '~/common/hooks';

import { getCohortUsers, getCohortGroups } from '../../api';

import { Cohort } from '../../types';

import { MastermindContext } from './reducer';

export const useCohortUsersReloader = (cohort: Cohort) => {
  const api = useAPI();
  const dispatch = useContext(MastermindContext);

  return useCallback(async () => {
    const users = await getCohortUsers(api, cohort.id);
    dispatch({
      type: 'REPLACE_USERS',
      payload: {
        users,
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
