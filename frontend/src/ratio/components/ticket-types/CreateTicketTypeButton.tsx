import { useCallback } from 'react';

import { useMutation } from '@apollo/client';

import { FormShapeModalButton } from '~/components/forms';
import { ShapeToValues } from '~/components/forms/types';

import { CreateRatioTicketTypeDocument } from './queries.generated';

interface Props {
  training_id: string;
}

const CreateTicketTypeButton: React.FC<Props> = ({ training_id }) => {
  const [addTicketTypeMutation] = useMutation(CreateRatioTicketTypeDocument, {
    refetchQueries: ['RatioTrainingBySlug'],
    awaitRefetchQueries: true,
  });

  const shape = [
    { name: 'price', title: 'Стоимость', type: 'number' },
    { name: 'name', title: 'Название', type: 'string' },
    {
      name: 'discount_by_email',
      title: "Сумма одноразового промокода по e-mail'у",
      type: 'number',
    },
    {
      name: 'discount_percent_by_email',
      title: "Процент скидки одноразового промокода по e-mail'у",
      type: 'number',
    },
  ] as const;

  type Values = ShapeToValues<typeof shape>;

  const cb = useCallback(
    async (values: Values) => {
      const { data } = await addTicketTypeMutation({
        variables: {
          input: {
            training_id,
            price: parseInt(values.price, 10),
            name: values.name,
            discount_by_email: parseInt(values.discount_by_email, 10),
            discount_percent_by_email: parseInt(
              values.discount_percent_by_email,
              10
            ),
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
    <FormShapeModalButton
      post={cb}
      shape={shape}
      defaultValues={{
        discount_by_email: '0',
        discount_percent_by_email: '0',
      }}
      buttonLabel="Добавить"
      modalSubmitLabel="Добавить"
      modalTitle="Добавить тип билета"
    />
  );
};

export default CreateTicketTypeButton;
