import React from 'react';

import { useMutation } from '@apollo/client';

import { FormShapeModal } from '~/components/forms';
import { ShapeToValues } from '~/components/forms/types';
import { useNotification } from '~/frontkit';

import { CreateRatioPromocodeDocument } from './queries.generated';

interface Props {
  close: () => void;
  ticketTypeId?: string;
  trainingId?: string;
}

const shape = [
  { name: 'code', type: 'string' },
  { name: 'discount', type: 'number' },
  { name: 'uses_max', type: 'number', optional: true },
] as const;

type FormValues = ShapeToValues<typeof shape>;

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

  const post = async (v: FormValues) => {
    const result = await create({
      variables: {
        input: {
          code: v.code,
          discount: parseInt(v.discount, 10),
          uses_max: v.uses_max ? parseInt(v.uses_max, 10) : undefined,
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
    <FormShapeModal
      close={close}
      shape={shape}
      submitLabel="Создать"
      title="Создание промокода"
      post={post}
    />
  );
};

export default CreatePromocodeModal;
