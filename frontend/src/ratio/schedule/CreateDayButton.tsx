import ApolloModalFormButton from '~/components/forms/ApolloModalFormButton';
import { FormShape } from '~/components/forms/types';

import {
  TrainingFragment,
  useRatioTrainingAddDayMutation,
} from '../queries.generated';

interface Props {
  training: TrainingFragment;
}

const CreateDayButton: React.FC<Props> = ({ training }) => {
  const [createMutation] = useRatioTrainingAddDayMutation({
    refetchQueries: ['RatioTrainingWithSchedule'],
    awaitRefetchQueries: true,
  });

  const shape: FormShape = [
    {
      name: 'training_slug',
      type: 'string',
      value: training.slug,
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
      fields={shape}
    />
  );
};

export default CreateDayButton;
