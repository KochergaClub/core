import { MutationModalButton } from '~/components/forms';

import { RatioTrainingAddDayDocument, RatioTrainingFragment } from '../queries.generated';

const shape = [
  {
    name: 'date',
    type: 'date',
  },
] as const;

interface Props {
  training: RatioTrainingFragment;
}

const CreateDayButton: React.FC<Props> = ({ training }) => {
  return (
    <MutationModalButton
      mutation={RatioTrainingAddDayDocument}
      valuesToVariables={(v) => ({
        input: {
          training_slug: training.slug,
          date: v.date,
        },
      })}
      refetchQueries={['RatioTrainingWithSchedule']}
      shape={shape}
      buttonLabel="Добавить день"
      modalSubmitLabel="Добавить"
      modalTitle="Добавить день"
    />
  );
};

export default CreateDayButton;
