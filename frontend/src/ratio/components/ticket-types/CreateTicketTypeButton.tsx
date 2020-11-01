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
    { name: 'name', title: 'Название', type: 'string' },
    {
      name: 'discount_by_email',
      title: "Сумма одноразового промокода по e-mail'у",
      type: 'number',
      default: 0,
    },
    {
      name: 'discount_percent_by_email',
      title: "Процент скидки одноразового промокода по e-mail'у",
      type: 'number',
      default: 0,
    },
  ];

  type Values = {
    price: number;
    name: string;
    discount_by_email: number;
    discount_percent_by_email: number;
  };

  const cb = useCallback(
    async (values: Values) => {
      const { data } = await addTicketTypeMutation({
        variables: {
          input: {
            training_id,
            price: values.price,
            name: values.name,
            discount_by_email: values.discount_by_email,
            discount_percent_by_email: values.discount_percent_by_email,
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
