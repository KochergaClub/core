import { useCallback } from 'react';

import { useMutation } from '@apollo/client';

import ModalFormButton from '~/components/forms/ModalFormButton';
import { FormShape } from '~/components/forms/types';

import { CreateRatioTicketTypeDocument } from './queries.generated';

interface Props {
  training_id: string;
}

const CreateTicketTypeButton: React.FC<Props> = ({ training_id }) => {
  const [addTicketTypeMutation] = useMutation(CreateRatioTicketTypeDocument, {
    refetchQueries: ['RatioTrainingBySlug'],
    awaitRefetchQueries: true,
  });

  const fields: FormShape = [
    { name: 'price', title: 'Стоимость', type: 'number' },
  ];

  type Values = {
    price: number;
  };

  const cb = useCallback(
    async (values: Values) => {
      const { data } = await addTicketTypeMutation({
        variables: {
          input: {
            training_id,
            price: values.price,
          },
        },
      });

      if (!data) {
        throw new Error('add ticket type failed');
      }
    },
    [addTicketTypeMutation, training_id]
  );

  return (
    <ModalFormButton
      post={cb}
      shape={fields}
      buttonName="Добавить"
      modalButtonName="Добавить"
      modalTitle="Добавить вид билета"
    />
  );
};

export default CreateTicketTypeButton;
