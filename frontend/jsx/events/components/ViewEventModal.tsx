import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import styled from 'styled-components';

import { FaExternalLinkAlt } from 'react-icons/fa';

import { A, Button, Modal, Row } from '@kocherga/frontkit';

import { useFocusOnFirstModalRender, useCommonHotkeys } from '~/common/hooks';
import { State } from '~/redux/store';

import { selectEventById } from '../features/events';
import { closeUI, startEditUI } from '../features/calendarUI';

// not redux-connected version! TeamCalendarPage is not migrated to redux yet
import { EventInfo } from './EventInfo';

interface Props {
  eventId: string;
}

const EventTitle = styled.header`
  font-size: 1.6em;
  line-height: 1;
  margin-bottom: 10px;
`;

const ExpandLink: React.FC<{ href: string }> = ({ href }) => (
  <A href={href} target="_blank">
    Подробнее <FaExternalLinkAlt />
  </A>
);

const ViewEventModal: React.FC<Props> = ({ eventId }) => {
  const dispatch = useDispatch();

  const event = useSelector((state: State) => selectEventById(state, eventId));
  const focus = useFocusOnFirstModalRender();

  const editCb = useCallback(() => {
    dispatch(startEditUI(eventId));
  }, [dispatch]);

  const closeCb = useCallback(() => {
    dispatch(closeUI());
  }, [dispatch]);

  const hotkeys = useCommonHotkeys({
    onEscape: closeCb,
  });

  return (
    <Modal>
      <Modal.Header toggle={closeCb}>&nbsp;</Modal.Header>
      <Modal.Body ref={focus} {...hotkeys}>
        <EventTitle>{event.title}</EventTitle>
        <EventInfo event={event} />
      </Modal.Body>
      <Modal.Footer>
        <Row vCentered spaced>
          <small>
            <ExpandLink href={`/team/events/view/${event.id}`} />
          </small>
          <Button onClick={editCb}>Редактировать</Button>
        </Row>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewEventModal;
