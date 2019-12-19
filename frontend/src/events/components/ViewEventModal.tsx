import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import styled from 'styled-components';

import { FaExternalLinkAlt } from 'react-icons/fa';

import { A, Button, Modal, Row } from '@kocherga/frontkit';

import { useFocusOnFirstModalRender, useCommonHotkeys } from '~/common/hooks';

import { Event } from '../types';

import * as calendarUI from '../features/calendarUI';

// not redux-connected version! TeamCalendarPage is not migrated to redux yet
import { EventInfo } from './EventInfo';

interface Props {
  event: Event | null;
  closeCb: () => void;
  editCb: () => void;
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

const ViewEventModal: React.FC<Props> = ({ event, closeCb, editCb }) => {
  const focus = useFocusOnFirstModalRender();

  const hotkeys = useCommonHotkeys({
    onEscape: closeCb,
  });

  if (!event) {
    return null; // shouldn't happen
  }

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

const mapStateToProps = createStructuredSelector({
  event: calendarUI.selectActiveEvent,
});

const mapDispatchToProps = {
  closeCb: calendarUI.closeUI,
  editCb: calendarUI.switchFromViewToEditUI,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewEventModal);
