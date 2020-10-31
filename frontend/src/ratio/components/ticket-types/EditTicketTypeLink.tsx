import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { useMutation } from '@apollo/client';

import { AsyncButton } from '~/components';
import { BasicInputField } from '~/components/forms2';
import { Button, Column, ControlsFooter, Modal } from '~/frontkit';

import { RatioTicketTypeFragment } from '../../queries.generated';
import { DeleteRatioTicketTypeDocument, UpdateRatioTicketTypeDocument } from './queries.generated';

const StyledA = styled.a`
  color: inherit;
  text-decoration: inherit;
`;

interface ModalProps {
  ticketType: RatioTicketTypeFragment;
  close: () => void;
}

const EditModal: React.FC<ModalProps> = ({ ticketType, close }) => {
  type FormData = {
    name: string;
    price: string;
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
              defaultValue={String(ticketType.price)}
              form={form}
              required
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

interface Props {
  ticketType: RatioTicketTypeFragment;
}

const EditTicketTypeLink: React.FC<Props> = ({ ticketType, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback((e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <StyledA href="#" onClick={open}>
        {children}
      </StyledA>
      {isOpen ? <EditModal close={close} ticketType={ticketType} /> : null}
    </>
  );
};

export default EditTicketTypeLink;
