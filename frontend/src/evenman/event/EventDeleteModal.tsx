import Router from 'next/router';
import { useCallback, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import styled from 'styled-components';

import { useMutation } from '@apollo/client';
import { Button, ControlsFooter, Modal } from '@kocherga/frontkit';

import { AsyncButton } from '~/components';

import { rootRoute } from '../routes';
import { EvenmanEvent_DetailsFragment, EvenmanEventDeleteDocument } from './queries.generated';

interface Props {
  event: EvenmanEvent_DetailsFragment;
  close: () => void;
}

const CenteredLine = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-items: center;

  > * + * {
    margin-left: 2px;
  }
`;

const EventDeleteModal: React.FC<Props> = ({ event, close }) => {
  const [deleted, setDeleted] = useState(false);
  const [deleteMutation] = useMutation(EvenmanEventDeleteDocument, {
    variables: { id: event.id },
  });

  const act = useCallback(async () => {
    await deleteMutation();
    const route = rootRoute();
    setDeleted(true);
    Router.push(route.href, route.as);
  }, [deleteMutation]);

  if (deleted) {
    return null;
  }

  return (
    <Modal>
      <Modal.Header toggle={close}>Удалить событие</Modal.Header>
      <Modal.Body>Вы уверены?</Modal.Body>
      <Modal.Footer>
        <ControlsFooter>
          <Button onClick={close}>Отменить</Button>
          <AsyncButton act={act} kind="primary">
            <CenteredLine>
              <FaTrash />
              <span>Удалить</span>
            </CenteredLine>
          </AsyncButton>
        </ControlsFooter>
      </Modal.Footer>
    </Modal>
  );
};

export default EventDeleteModal;
