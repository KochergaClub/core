import React, { useCallback } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select';

import { useMutation } from '@apollo/client';
import { Button, Column, ControlsFooter, Label, Modal } from '@kocherga/frontkit';

import { WideInput } from '~/components';

import {
    RatioCreateOrderDocument, RatioOrderFragment, RatioTicketType_ForPickerFragment
} from '../queries.generated';

interface Props {
  close: () => void;
  ticketTypes: RatioTicketType_ForPickerFragment[];
  onOrderCreated: (order: RatioOrderFragment) => void;
}

type SelectOptionType = {
  value: RatioTicketType_ForPickerFragment;
  label: string;
};

type FormData = {
  ticket_type: SelectOptionType;
  email: string;
  first_name: string;
  last_name: string;
  city: string;
};

const FormOrderModal: React.FC<Props> = ({
  close,
  ticketTypes,
  onOrderCreated,
}) => {
  const form = useForm<FormData>();
  const watchTicketType = form.watch('ticket_type');

  const [createOrderMutation] = useMutation(RatioCreateOrderDocument);

  const postForm = useCallback(
    async (v: FormData) => {
      const { data } = await createOrderMutation({
        variables: {
          input: {
            ticket_type_id: v.ticket_type.value.id,
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
    <Modal>
      <Modal.Header toggle={close}>Регистрация</Modal.Header>
      <form onSubmit={form.handleSubmit(postForm)}>
        <Modal.Body>
          <Column stretch gutter={16}>
            <div>
              <label>В каком потоке вы участвуете?</label>
              <Controller
                name="ticket_type"
                as={Select}
                options={ticketTypes.map(
                  (ticketType) =>
                    ({
                      value: ticketType,
                      label: ticketType.name,
                    } as SelectOptionType)
                )}
                control={form.control}
              />
            </div>
            <div>
              <label>E-mail участника</label>
              <WideInput type="email" name="email" ref={form.register} />
            </div>
            <div>
              <label>Имя участника</label>
              <WideInput type="string" name="first_name" ref={form.register} />
            </div>
            <div>
              <label>Фамилия участника</label>
              <WideInput type="string" name="last_name" ref={form.register} />
            </div>
            <div>
              <label>Из какого города вы планируете проходить курс?</label>
              <WideInput type="string" name="city" ref={form.register} />
            </div>
          </Column>
        </Modal.Body>
        <Modal.Footer>
          <ControlsFooter>
            <Button type="submit">
              Оплатить
              {watchTicketType ? ` ${watchTicketType.value.price} руб.` : ''}
            </Button>
          </ControlsFooter>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default FormOrderModal;
