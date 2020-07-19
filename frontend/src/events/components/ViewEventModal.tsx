import { useContext, useCallback } from 'react';

import styled from 'styled-components';

import { FaExternalLinkAlt } from 'react-icons/fa';

import { A, Button, Modal, Row } from '@kocherga/frontkit';

import { useFocusOnFirstModalRender, useCommonHotkeys } from '~/common/hooks';

import EventInfo from './EventInfo';
import {
  CalendarUIContext,
  closeUI,
  viewToEditUI,
} from '../reducers/calendarUI';
import { useTeamCalendarEventQuery } from '../queries.generated';

interface Props {
  event_id: string;
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

const ViewEventModal: React.FC<Props> = ({ event_id }) => {
  const queryResults = useTeamCalendarEventQuery({
    variables: { id: event_id },
  });
  const { dispatch } = useContext(CalendarUIContext);

  const closeCb = useCallback(() => {
    dispatch(closeUI());
  }, [dispatch]);

  const editCb = useCallback(() => {
    dispatch(viewToEditUI());
  }, [dispatch]);

  const focus = useFocusOnFirstModalRender();

  const hotkeys = useCommonHotkeys({
    onEscape: closeCb,
  });

  if (!queryResults.data?.event) {
    return null; // FIXME - better error/loading reporting
  }

  const event = queryResults.data.event;

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
