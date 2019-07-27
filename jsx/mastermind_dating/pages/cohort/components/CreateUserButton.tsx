import React, { useCallback, useContext } from 'react';

import { useAPI } from '~/common/hooks';
import { FormField } from '~/components/crud/types';
import CreateButton from '~/components/crud/CreateButton';

import { MastermindContext } from '../reducer';
import { getCohortUsers } from '../../../api';
import { Cohort } from '../../../types';

interface Props {
  cohort: Cohort;
}

const CreateUserButton = ({ cohort }: Props) => {
  const fields: FormField[] = [
    { name: 'cohort_id', type: 'number', readonly: true, value: cohort.id },
    { name: 'email', type: 'string' },
  ];
  const dispatch = useContext(MastermindContext);
  const api = useAPI();

  const onCreate = useCallback(async () => {
    const users = await getCohortUsers(api, cohort.id);
    dispatch({
      type: 'REPLACE_USERS',
      payload: {
        users,
      },
    });
  }, [api]);

  return (
    <CreateButton
      apiEndpoint="/mastermind_dating/user"
      fields={fields}
      displayName="Участник дейтинга"
      onCreate={onCreate}
    />
  );
};

export default CreateUserButton;
