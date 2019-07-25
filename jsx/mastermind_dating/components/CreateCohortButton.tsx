import React from 'react';

import CreateButton from '~/components/crud/CreateButton';
import { FormField } from '~/components/crud/types';

const CreateCohortButton = () => {
  const fields: FormField[] = [];

  return (
    <CreateButton
      apiEndpoint="/mastermind_dating/cohort"
      fields={fields}
      displayName="Когорта"
    />
  );
};

export default CreateCohortButton;
