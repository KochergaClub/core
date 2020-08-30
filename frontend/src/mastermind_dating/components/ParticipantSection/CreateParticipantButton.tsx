import { useCallback } from 'react';

import ModalFormButton from '~/components/forms/ModalFormButton';
import { FormShape } from '~/components/forms/types';

import {
    MastermindDatingCohortDetailsFragment as Cohort, useMastermindDatingCreateParticipantMutation
} from '../../queries.generated';

interface Props {
  cohort: Cohort;
}

const CreateParticipantButton = ({ cohort }: Props) => {
  const fields: FormShape = [{ name: 'email', type: 'string' }];

  const [createMutation] = useMastermindDatingCreateParticipantMutation({
    refetchQueries: ['MastermindDatingCohortById'],
    awaitRefetchQueries: true,
  });

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
    <ModalFormButton
      post={createCb}
      buttonName="Добавить"
      modalButtonName="Добавить"
      modalTitle="Добавить: Участник дейтинга"
      shape={fields}
    />
  );
};

export default CreateParticipantButton;
