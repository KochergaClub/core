import React, { useCallback } from 'react';

import { useMutation } from '@apollo/client';

import { FormShapeModalButton } from '~/components/forms';

import {
    MastermindDatingCohortDetailsFragment as Cohort, MastermindDatingCreateParticipantDocument
} from '../../queries.generated';

interface Props {
  cohort: Cohort;
}

const CreateParticipantButton = ({ cohort }: Props) => {
  const fields = [{ name: 'email', type: 'string' }] as const;

  const [createMutation] = useMutation(
    MastermindDatingCreateParticipantDocument,
    {
      refetchQueries: ['MastermindDatingCohortById'],
      awaitRefetchQueries: true,
    }
  );

  const createCb = useCallback(
    async (values) => {
      await createMutation({
        variables: {
          cohort_id: cohort.id,
          email: values.email,
        },
      });
    },
    [createMutation, cohort.id]
  );

  return (
    <FormShapeModalButton
      post={createCb}
      buttonLabel="Добавить"
      modalSubmitLabel="Добавить"
      modalTitle="Добавить: Участник дейтинга"
      shape={fields}
    />
  );
};

export default CreateParticipantButton;
