import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { useMutation } from '@apollo/client';

import { AsyncButton } from '~/components';
import { BasicInputField } from '~/components/forms2';
import { Button, Column, ControlsFooter, Modal } from '~/frontkit';

import { RatioTicketTypeFragment } from '../../queries.generated';
import { DeleteRatioTicketTypeDocument, UpdateRatioTicketTypeDocument } from './queries.generated';

interface Props {
  ticketType: RatioTicketTypeFragment;
  close: () => void;
}

const EditTicketTypeModal: React.FC<Props> = ({ ticketType, close }) => {
  type FormData = {
    name: string;
    price: string;
    discount_by_email: string;
  };

  const form = useForm<FormData>();

  const [deleteMutation] = useMutation(DeleteRatioTicketTypeDocument, {
    refetchQueries: ['RatioTrainingBySlug'],
    awaitRefetchQueries: true,
  });

  const [updateMutation] = useMutation(UpdateRatioTicketTypeDocument);

  const deleteCb = useCallback(async () => {
    await deleteMutation({
      variables: {
        input: {
          id: ticketType.id,
        },
      },
    });
    close();
  }, [deleteMutation, ticketType.id, close]);

  const updateCb = async (data: FormData) => {
    await updateMutation({
      variables: {
        input: {
          id: ticketType.id,
          price: parseInt(data.price, 10),
          name: data.name,
          discount_by_email: data.discount_by_email
            ? parseInt(data.discount_by_email, 10)
            : null,
        },
      },
    });
    close();
  };

  return (
    <Modal>
      <Modal.Header close={close}>Редактирование вида билета</Modal.Header>
      <form onSubmit={form.handleSubmit(updateCb)}>
        <Modal.Body>
          <Column gutter={16} stretch>
            <small>
              Якорь для Тильды:{' '}
              <code>#kocherga_order:ticket_type={ticketType.id}</code>
            </small>
            <BasicInputField
              title="Название"
              name="name"
              defaultValue={ticketType.name}
              form={form}
              required
            />
            <BasicInputField
              title="Стоимость"
              name="price"
              type="number"
              defaultValue={String(ticketType.price)}
              form={form}
              required
            />
            <BasicInputField
              title="Сумма одноразового промокода по e-mail'у"
              name="discount_by_email"
              type="number"
              defaultValue={String(ticketType.discount_by_email)}
              form={form}
            />
          </Column>
        </Modal.Body>
        <Modal.Footer>
          <ControlsFooter>
            <AsyncButton act={deleteCb} kind="danger">
              Удалить
            </AsyncButton>
            <Button
              loading={form.formState.isSubmitting}
              disabled={form.formState.isSubmitting}
              kind="primary"
              type="submit"
            >
              Сохранить
            </Button>
          </ControlsFooter>
        </Modal.Footer>
      </form>
    </Modal>
  );
};

export default EditTicketTypeModal;
