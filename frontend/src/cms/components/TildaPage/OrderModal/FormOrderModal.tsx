import React, { useCallback, useState } from 'react';
import { Controller, FieldError, useForm } from 'react-hook-form';
import Select from 'react-select';

import { useMutation } from '@apollo/client';

import {
    BasicInputField, ErrorMessage, FieldContainer, FieldErrorMessage
} from '~/components/forms2';
import { A, Button, Column, ControlsFooter, Label, Modal, Row } from '~/frontkit';

import {
    RatioCreateOrderDocument, RatioOrder_CreatedFragment, RatioTicketType_ForPickerFragment
} from '../queries.generated';

interface Props {
  close: () => void;
  ticketTypes: RatioTicketType_ForPickerFragment[];
  onOrderCreated: (order: RatioOrder_CreatedFragment) => void;
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
  // city: string;
  terms: boolean;
};

const FormOrderModal: React.FC<Props> = ({
  close,
  ticketTypes,
  onOrderCreated,
}) => {
  const form = useForm<FormData>();
  const watchTicketType = form.watch('ticket_type');
  const [submitError, setSubmitError] = useState('');

  const [createOrderMutation] = useMutation(RatioCreateOrderDocument);

  const postForm = useCallback(
    async (v: FormData) => {
      try {
        const { data } = await createOrderMutation({
          variables: {
            input: {
              ticket_type_id: v.ticket_type.value.id,
              email: v.email,
              first_name: v.first_name,
              last_name: v.last_name,
              // city: v.city,
              // TODO - payer
            },
          },
        });
        if (!data) {
          setSubmitError('Внутренняя ошибка');
          return { close: false };
        }
        switch (data.result.__typename) {
          case 'RatioOrder':
            onOrderCreated(data.result);
            break;
          case 'ValidationError':
            for (const error of data.result.errors) {
              form.setError(error.name, {
                type: 'manual',
                message: error.messages.join('. '),
              });
            }
            break;
          case 'GenericError':
            setSubmitError(data.result.message);
            break;
          default:
            setSubmitError('Неизвестная ошибка');
        }
        return { close: false };
      } catch (e) {
        setSubmitError('Внутренняя ошибка'); // probably mutation error, though we should check `e` type
        return { close: false };
      }
    },
    [createOrderMutation, onOrderCreated, form]
  );

  const ticketTypeToSelectOption = (
    ticketType: RatioTicketType_ForPickerFragment
  ) =>
    ({
      value: ticketType,
      label: ticketType.name,
    } as SelectOptionType);

  return (
    <Modal>
      <Modal.Header close={close}>Регистрация</Modal.Header>
      <form onSubmit={form.handleSubmit(postForm)}>
        <Modal.Body>
          <Column stretch gutter={16}>
            <FieldContainer
              title="Выберите вид билета"
              error={form.errors.ticket_type as FieldError | undefined}
            >
              <Controller
                name="ticket_type"
                as={Select}
                placeholder="Выбрать..."
                options={ticketTypes.map(ticketTypeToSelectOption)}
                defaultValue={
                  ticketTypes.length === 1
                    ? ticketTypeToSelectOption(ticketTypes[0])
                    : null
                }
                control={form.control}
                rules={{ required: true }}
              />
            </FieldContainer>
            <BasicInputField
              title="Ваш E-mail"
              name="email"
              type="email"
              placeholder="ludwig@wittgenstein.com"
              required
              form={form}
            />
            <BasicInputField
              title="Ваше имя"
              name="first_name"
              placeholder="Бертран"
              required
              form={form}
            />
            <BasicInputField
              title="Ваша фамилия"
              name="last_name"
              placeholder="Рассел"
              required
              form={form}
            />
            {/*
            <BasicInputField
              title="Из какого города вы планируете проходить курс?"
              name="city"
              placeholder="Москва"
              required
              form={form}
            />
            */}
            <div>
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
                      договора об оказании информационных услуг (публичная
                      оферта)
                    </A>
                  </div>
                </Row>
              </Label>
              <FieldErrorMessage error={form.errors.terms} />
            </div>
          </Column>
        </Modal.Body>
        <Modal.Footer>
          <ControlsFooter>
            <Row vCentered gutter={16}>
              {submitError && <ErrorMessage>{submitError}</ErrorMessage>}
              <Button
                type="submit"
                kind="primary"
                loading={form.formState.isSubmitting}
                disabled={form.formState.isSubmitting}
              >
                Оплатить
                {watchTicketType ? ` ${watchTicketType.value.price} руб.` : ''}
              </Button>
            </Row>
          </ControlsFooter>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default FormOrderModal;
