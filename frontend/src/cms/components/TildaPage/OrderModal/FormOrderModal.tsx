import React, { useCallback } from 'react';
import { Controller, FieldError, useForm } from 'react-hook-form';
import Select from 'react-select';

import { useMutation } from '@apollo/client';

import { BasicInput, ErrorMessage } from '~/components/forms2';
import { Button, Column, ControlsFooter, Label, Modal, Row } from '~/frontkit';

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
              <Row>
                <Label>В каком потоке вы участвуете?</Label>
                {form.errors.ticket_type && (
                  <ErrorMessage error={form.errors.ticket_type as FieldError} />
                )}
              </Row>
              <Controller
                name="ticket_type"
                as={Select}
                placeholder="Выбрать..."
                options={ticketTypes.map(
                  (ticketType) =>
                    ({
                      value: ticketType,
                      label: ticketType.name,
                    } as SelectOptionType)
                )}
                control={form.control}
                rules={{ required: true }}
              />
            </div>
            <BasicInput
              title="E-mail участника"
              name="email"
              placeholder="ludwig@wittgenstein.com"
              required
              form={form}
            />
            <BasicInput
              title="Имя участника"
              name="first_name"
              placeholder="Бертран"
              required
              form={form}
            />
            <BasicInput
              title="Фамилия участника"
              name="last_name"
              placeholder="Рассел"
              required
              form={form}
            />
            <BasicInput
              title="Из какого города вы планируете проходить курс?"
              name="city"
              placeholder="Москва"
              required
              form={form}
            />
          </Column>
        </Modal.Body>
        <Modal.Footer>
          <ControlsFooter>
            <Button type="submit" kind="primary">
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
