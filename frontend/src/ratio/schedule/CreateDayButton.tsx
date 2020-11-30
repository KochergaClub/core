import { useMutation } from '@apollo/client';

import { MutationModalButton } from '~/components/forms';

import { RatioTrainingAddDayDocument, RatioTrainingFragment } from '../queries.generated';

interface Props {
  training: RatioTrainingFragment;
}

const CreateDayButton: React.FC<Props> = ({ training }) => {
  const [createMutation] = useMutation(RatioTrainingAddDayDocument, {
    refetchQueries: ['RatioTrainingWithSchedule'],
    awaitRefetchQueries: true,
  });

  const shape = [
    {
      name: 'training_slug',
      type: 'string',
      default: training.slug,
      readonly: true,
    },
    {
      name: 'date',
      type: 'date',
    },
  ] as const;

  return (
    <MutationModalButton
      mutation={createMutation}
      buttonName="Добавить день"
      modalButtonName="Добавить"
      modalTitle="Добавить день"
      shape={shape}
      defaultValues={{
        training_slug: training.slug,
      }}
    />
  );
};

export default CreateDayButton;
