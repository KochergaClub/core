import React from 'react';

import { FormField } from '~/components/crud/types';
import CreateButton from '~/components/crud/CreateButton';

import { Cohort } from '../../../types';
import { useCohortUsersReloader } from '../hooks';

interface Props {
  cohort: Cohort;
}

const CreateUserButton = ({ cohort }: Props) => {
  const fields: FormField[] = [
    { name: 'cohort_id', type: 'number', readonly: true, value: cohort.id },
    { name: 'email', type: 'string' },
  ];

  const cohortUsersReloader = useCohortUsersReloader(cohort);

  return (
    <CreateButton
      apiEndpoint="/mastermind_dating/user"
      fields={fields}
      displayName="Участник дейтинга"
      onCreate={cohortUsersReloader}
    />
  );
};

export default CreateUserButton;
