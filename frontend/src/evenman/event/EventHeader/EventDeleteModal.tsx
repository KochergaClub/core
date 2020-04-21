import { useCallback, useState } from 'react';
import styled from 'styled-components';
import Router from 'next/router';

import { FaTrash } from 'react-icons/fa';
import { Modal, ControlsFooter, Button } from '@kocherga/frontkit';

import { AsyncButton } from '~/components';
import {
  EvenmanEvent_DetailsFragment,
  useEvenmanEventDeleteMutation,
} from '../queries.generated';
import { rootRoute } from '../../routes';

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
  const [deleteMutation] = useEvenmanEventDeleteMutation({
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
