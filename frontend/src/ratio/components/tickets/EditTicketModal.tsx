import React, { useCallback } from 'react';

import { useMutation, useQuery } from '@apollo/client';

import { FormShapeModal } from '~/components/forms';

import { UpdateRatioTicketDocument } from '../../queries.generated';
import { RatioTrainingBySlugDocument } from '../trainings/queries.generated';
import { RatioTicketWithTrainingFragment } from './queries.generated';
import { buildTicketFields } from './utils';

type Props = {
  close: () => void;
  ticket: RatioTicketWithTrainingFragment;
};

export const EditTicketModal: React.FC<Props> = ({ close, ticket }) => {
  const [editTicketMutation] = useMutation(UpdateRatioTicketDocument, {
    refetchQueries: ['RatioTrainingBySlug'],
    awaitRefetchQueries: true,
  });

  type Values = {
    first_name: string;
    last_name: string;
    ticket_type?: string;
  };

  const cb = useCallback(
    async (unknownValues) => {
      const values = unknownValues as Values;
      const { data } = await editTicketMutation({
        variables: {
          input: {
            id: ticket.id,
            ticket_type: values.ticket_type,
            first_name: values.first_name,
            last_name: values.last_name,
          },
        },
      });

      if (!data) {
        throw new Error('edit ticket failed');
      }
    },
    [editTicketMutation, ticket.id]
  );

  const trainingQueryResults = useQuery(RatioTrainingBySlugDocument, {
    variables: { slug: ticket.training.slug },
    fetchPolicy: 'cache-first',
  });

  if (!trainingQueryResults.data) {
    return null;
  }

  const allowedNames = new Set(['first_name', 'last_name', 'ticket_type']);
  const fields = buildTicketFields(
    trainingQueryResults.data.training
  ).filter((f) => allowedNames.has(f.name));

  return (
    <FormShapeModal
      close={close}
      post={cb}
      shape={fields}
      defaultValues={{
        first_name: ticket.first_name,
        last_name: ticket.last_name,
        ticket_type: ticket.ticket_type?.id,
      }}
      submitLabel="Сохранить"
      title="Редактировать билет"
    />
  );
};
