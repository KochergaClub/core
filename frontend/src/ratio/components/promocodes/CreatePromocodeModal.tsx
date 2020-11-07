import { useMutation } from '@apollo/client';

import ModalForm from '~/components/forms/ModalForm';
import { FormShape } from '~/components/forms/types';
import { useNotification } from '~/frontkit';

import { CreateRatioPromocodeDocument } from './queries.generated';

interface Props {
  close: () => void;
  ticketTypeId?: string;
  trainingId?: string;
}

const shape: FormShape = [
  { name: 'code', type: 'string' },
  { name: 'discount', type: 'number' },
  { name: 'uses_max', type: 'number', optional: true },
];

const CreatePromocodeModal: React.FC<Props> = ({
  close,
  ticketTypeId,
  trainingId,
}) => {
  const notify = useNotification();
  const [create] = useMutation(CreateRatioPromocodeDocument, {
    refetchQueries: ['RatioTrainingBySlug'],
    awaitRefetchQueries: true,
  });

  type FormValues = {
    code: string;
    discount: number;
    uses_max?: number;
  };

  const post = async (v: FormValues) => {
    const result = await create({
      variables: {
        input: {
          code: v.code,
          discount: v.discount,
          uses_max: v.uses_max,
          ticket_type_id: ticketTypeId,
          training_id: trainingId,
        },
      },
    });
    if (!result.data) {
      notify({ text: 'Mutation failed', type: 'Error' });
      return { close: false };
    }
    switch (result.data.result.__typename) {
      case 'RatioPromocode':
        return;
      default:
        // TODO - display error
        notify({ text: 'Error', type: 'Error' });
        return { close: false };
    }
  };

  return (
    <ModalForm
      close={close}
      shape={shape}
      modalButtonName="Создать"
      modalTitle="Создание промокода"
      post={post}
    />
  );
};

export default CreatePromocodeModal;
