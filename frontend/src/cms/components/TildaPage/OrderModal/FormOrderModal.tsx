import React, { useCallback, useMemo } from 'react';

import { useMutation } from '@apollo/client';

import ModalForm from '~/components/forms/ModalForm';
import { FormShape } from '~/components/forms/types';

import {
    RatioCreateOrderDocument, RatioOrderFragment, RatioTicketType_ForPickerFragment
} from '../queries.generated';

interface Values {
  ticket_type_id: string;
  email: string;
  first_name: string;
  last_name: string;
  // recipientName: string;
  // recipientEmail: string;
  city: string;
}

interface Props {
  close: () => void;
  ticketTypes: RatioTicketType_ForPickerFragment[];
  onOrderCreated: (order: RatioOrderFragment) => void;
}

const FormOrderModal: React.FC<Props> = ({
  close,
  ticketTypes,
  onOrderCreated,
}) => {
  const [createOrderMutation] = useMutation(RatioCreateOrderDocument);

  const shape: FormShape = useMemo(
    () => [
      {
        type: 'choice',
        name: 'ticket_type_id',
        title: 'В каком потоке вы участвуете?',
        options: ticketTypes.map((ticketType) => [
          ticketType.id,
          `TODO (${ticketType.price})`,
        ]),
      },
      {
        type: 'email',
        name: 'email',
        title: 'E-mail участника',
      },
      {
        type: 'string',
        name: 'first_name',
        title: 'Имя участника',
      },
      {
        type: 'string',
        name: 'last_name',
        title: 'Фамилия участника',
      },
      // {
      //   type: 'email',
      //   name: 'recipientEmail',
      //   title: 'E-mail получающего',
      //   optional: true,
      // },
      // {
      //   type: 'string',
      //   name: 'recipientName',
      //   title: 'Полные, настоящие имя и фамилия участвующего в курсе',
      //   optional: true,
      // },
      {
        type: 'string',
        name: 'city',
        title: 'Из какого города вы планируете проходить курс?',
      },
    ],
    [ticketTypes]
  );

  const postForm = useCallback(
    async (v: Values) => {
      const { data } = await createOrderMutation({
        variables: {
          input: {
            ticket_type_id: v.ticket_type_id,
            email: v.email,
            first_name: v.first_name, // FIXME
            last_name: v.last_name,
            city: v.city,
            // TODO - payer
          },
        },
      });
      if (!data) {
        throw new Error('Mutation failed');
      }
      onOrderCreated(data.result.order);
      return { close: false };
    },
    [createOrderMutation, onOrderCreated]
  );

  return (
    <ModalForm
      modalTitle="Регистрация"
      shape={shape}
      modalButtonName="Оплатить"
      post={postForm}
      close={close}
    />
  );
};

export default FormOrderModal;
