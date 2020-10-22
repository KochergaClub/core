import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { useMutation } from '@apollo/client';
import { Button, Column, ControlsFooter, Input, Label, Modal } from '@kocherga/frontkit';

import { AsyncButton } from '~/components';

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
  const form = useForm();

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

  const updateCb = async (data: any) => {
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
      <Modal.Header toggle={close}>Редактирование вида билета</Modal.Header>
      <form onSubmit={form.handleSubmit(updateCb)}>
        <Modal.Body>
          <Column stretch>
            <Label>Название</Label>
            <Input
              type="text"
              name="name"
              defaultValue={ticketType.name}
              ref={form.register}
            />
            <Label>Стоимость</Label>
            <Input
              type="number"
              name="price"
              defaultValue={ticketType.price}
              ref={form.register}
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
