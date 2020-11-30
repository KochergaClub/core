import React, { useCallback, useState } from 'react';
import { Controller, FieldError, useForm } from 'react-hook-form';
import Select from 'react-select';
import styled from 'styled-components';

import { useMutation } from '@apollo/client';

import { useCommonHotkeys, useFocusOnFirstModalRender } from '~/common/hooks';
import {
    BasicInputField, ErrorMessage, FieldContainer, FieldErrorMessage
} from '~/components/forms';
import { A, Button, Column, ControlsFooter, Label, Modal, Row } from '~/frontkit';

import PromocodeField from './PromocodeField';
import {
    RatioCreateOrderDocument, RatioOrder_CreatedFragment, RatioTicketType_ForPickerFragment
} from './queries.generated';

interface Props {
  close: () => void;
  ticketTypes: RatioTicketType_ForPickerFragment[];
  onOrderCreated: (order: RatioOrder_CreatedFragment) => void;
}

type SelectOptionType = {
  value: RatioTicketType_ForPickerFragment;
  label: string;
};

export type FormData = {
  ticket_type: SelectOptionType;
  email: string;
  first_name: string;
  last_name: string;
  // city: string;
  promocode: string;
  terms: boolean;
};

const ticketTypeToSelectOption = (
  ticketType: RatioTicketType_ForPickerFragment
) =>
  ({
    value: ticketType,
    label: ticketType.name,
  } as SelectOptionType);

const Container = styled.div`
  box-sizing: border-box; // OrderModal is used with tilda which sets box-sizing: content-box;
  input {
    box-sizing: border-box;
  }
`;

const FormOrderModal: React.FC<Props> = ({
  close,
  ticketTypes,
  onOrderCreated,
}) => {
  const form = useForm<FormData>({
    defaultValues: {
      ticket_type:
        ticketTypes.length === 1
          ? ticketTypeToSelectOption(ticketTypes[0])
          : undefined,
      promocode: '',
    },
  });
  const watchTicketType = form.watch('ticket_type');
  const [submitError, setSubmitError] = useState('');
  const [discountedPrice, setDiscountedPrice] = useState<number | undefined>(
    undefined
  );

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
              promocode: v.promocode,
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

  const hotkeys = useCommonHotkeys({ onEscape: close });
  const focus = useFocusOnFirstModalRender();

  return (
    <Modal>
      <Modal.Header close={close}>Регистрация</Modal.Header>
      <form onSubmit={form.handleSubmit(postForm)}>
        <Modal.Body {...hotkeys} ref={focus}>
          <Container>
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
              <PromocodeField
                form={form}
                setDiscountedPrice={setDiscountedPrice}
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
          </Container>
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
                {watchTicketType
                  ? ` ${
                      discountedPrice === undefined
                        ? watchTicketType.value.price
                        : discountedPrice
                    } руб.`
                  : ''}
              </Button>
            </Row>
          </ControlsFooter>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default FormOrderModal;
