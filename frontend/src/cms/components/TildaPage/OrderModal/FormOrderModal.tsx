import React, { useCallback } from 'react';
import { Controller, FieldError, useForm } from 'react-hook-form';
import Select from 'react-select';

import { useMutation } from '@apollo/client';

import { BasicInputField, ErrorMessage, FieldContainer } from '~/components/forms2';
import { A, Button, Column, ControlsFooter, Label, Modal, Row } from '~/frontkit';

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
  terms: boolean;
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
            first_name: v.first_name,
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
            <FieldContainer
              title="В каком потоке вы участвуете?"
              error={form.errors.ticket_type as FieldError | undefined}
            >
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
            </FieldContainer>
            <BasicInputField
              title="E-mail участника"
              name="email"
              placeholder="ludwig@wittgenstein.com"
              required
              form={form}
            />
            <BasicInputField
              title="Имя участника"
              name="first_name"
              placeholder="Бертран"
              required
              form={form}
            />
            <BasicInputField
              title="Фамилия участника"
              name="last_name"
              placeholder="Рассел"
              required
              form={form}
            />
            <BasicInputField
              title="Из какого города вы планируете проходить курс?"
              name="city"
              placeholder="Москва"
              required
              form={form}
            />
            <Label>
              <Row vCentered gutter={8}>
                <input
                  type="checkbox"
                  name="terms"
                  defaultChecked={true}
                  ref={form.register({ required: true })}
                />
                <div>
                  Ознакомлен и согласен с условиями{' '}
                  <A href="/oferta" target="_blank">
                    договора об оказании информационных услуг (публичная оферта)
                  </A>
                </div>
              </Row>
              <ErrorMessage error={form.errors.terms} />
            </Label>
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
