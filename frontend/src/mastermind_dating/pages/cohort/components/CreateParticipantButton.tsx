import React from 'react';

import { FormShape } from '~/components/forms/types';
import CreateButton from '~/components/crud/CreateButton';

import { Cohort } from '../../../types';
import { useCohortParticipantsReloader } from '../hooks';

interface Props {
  cohort: Cohort;
}

const CreateParticipantButton = ({ cohort }: Props) => {
  const fields: FormShape = [
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
