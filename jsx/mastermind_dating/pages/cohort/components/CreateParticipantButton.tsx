import React from 'react';

import { FormField } from '~/components/crud/types';
import CreateButton from '~/components/crud/CreateButton';

import { Cohort } from '../../../types';
import { useCohortParticipantsReloader } from '../hooks';

interface Props {
  cohort: Cohort;
}

const CreateParticipantButton = ({ cohort }: Props) => {
  const fields: FormField[] = [
    { name: 'cohort_id', type: 'number', readonly: true, value: cohort.id },
    { name: 'email', type: 'string' },
  ];

  const cohortParticipantsReloader = useCohortParticipantsReloader(cohort);

  return (
    <CreateButton
      apiEndpoint="/mastermind_dating/participant"
      fields={fields}
      entityName="Участник дейтинга"
      onCreate={cohortParticipantsReloader}
    />
  );
};

export default CreateParticipantButton;
