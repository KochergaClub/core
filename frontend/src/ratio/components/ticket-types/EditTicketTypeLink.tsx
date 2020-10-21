import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import { useMutation } from '@apollo/client';
import { Modal } from '@kocherga/frontkit';

import { AsyncButton } from '~/components';

import { RatioTicketTypeFragment } from '../../queries.generated';
import { DeleteRatioTicketTypeDocument } from './queries.generated';

const StyledA = styled.a`
  color: inherit;
  text-decoration: inherit;
`;

interface ModalProps {
  ticketType: RatioTicketTypeFragment;
  close: () => void;
}

const EditModal: React.FC<ModalProps> = ({ ticketType, close }) => {
  const [deleteMutation] = useMutation(DeleteRatioTicketTypeDocument, {
    refetchQueries: ['RatioTrainingBySlug'],
    awaitRefetchQueries: true,
  });

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

  return (
    <Modal>
      <Modal.Header toggle={close}>{ticketType.price}</Modal.Header>
      <Modal.Footer>
        <AsyncButton act={deleteCb}>Удалить</AsyncButton>
      </Modal.Footer>
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
