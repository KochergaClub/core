import React, { useCallback } from 'react';

import { useMutation } from '@apollo/client';

import { FormShapeModalButton } from '~/components/forms';

import { RatioAddTicketDocument, RatioTrainingFragment } from '../../queries.generated';
import { buildTicketFields } from './utils';

type Props = {
  training: RatioTrainingFragment;
};

export const CreateTicketButton: React.FC<Props> = ({ training }) => {
  const [addTicketMutation] = useMutation(RatioAddTicketDocument, {
    refetchQueries: ['RatioTrainingBySlug'],
    awaitRefetchQueries: true,
  });

  const fields = buildTicketFields(training);

  type Values = {
    email: string;
    first_name: string;
    last_name: string;
    payment_amount: string;
    ticket_type?: string;
  };

  const cb = useCallback(
    async (unknownValues) => {
      const values = unknownValues as Values;
      const { data } = await addTicketMutation({
        variables: {
          params: {
            training: training.id,
            ticket_type: values.ticket_type,
            email: values.email,
            payment_amount: parseInt(values.payment_amount, 10),
            first_name: values.first_name,
            last_name: values.last_name,
          },
        },
      });

      if (!data) {
        throw new Error('add ticket failed');
      }
    },
    [addTicketMutation, training.id]
  );

  return (
    <FormShapeModalButton
      post={cb}
      shape={fields}
      buttonLabel="Добавить"
      modalSubmitLabel="Добавить"
      modalTitle="Добавить билет"
    />
  );
};
