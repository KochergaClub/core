import { useMutation } from '@apollo/client';

import ApolloModalFormButton from '~/components/forms/ApolloModalFormButton';
import { FormShape } from '~/components/forms/types';

import { RatioTrainingAddDayDocument, RatioTrainingFragment } from '../queries.generated';

interface Props {
  training: RatioTrainingFragment;
}

const CreateDayButton: React.FC<Props> = ({ training }) => {
  const [createMutation] = useMutation(RatioTrainingAddDayDocument, {
    refetchQueries: ['RatioTrainingWithSchedule'],
    awaitRefetchQueries: true,
  });

  const shape: FormShape = [
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
  ];

  return (
    <ApolloModalFormButton
      mutation={createMutation}
      buttonName="Добавить день"
      modalButtonName="Добавить"
      modalTitle="Добавить день"
      shape={shape}
    />
  );
};

export default CreateDayButton;
