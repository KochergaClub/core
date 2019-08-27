import React, { useCallback, useContext } from 'react';

import CreateButton from '~/components/crud/CreateButton';
import { FormField } from '~/components/crud/types';
import { useAPI } from '~/common/hooks';

import { MastermindContext } from '../reducer';

import { getCohorts } from '../../../api';

const CreateCohortButton = () => {
  const fields: FormField[] = [];
  const dispatch = useContext(MastermindContext);
  const api = useAPI();

  const onCreate = useCallback(async () => {
    const cohorts = await getCohorts(api);
    dispatch({
      type: 'REPLACE_COHORTS_ACTION',
      payload: {
        cohorts,
      },
    });
  }, [api]);

  return (
    <CreateButton
      apiEndpoint="/mastermind_dating/cohort"
      fields={fields}
      entityName="Когорта"
      onCreate={onCreate}
    />
  );
};

export default CreateCohortButton;
