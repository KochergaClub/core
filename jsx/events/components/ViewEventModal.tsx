import React, { useCallback } from 'react';

import styled from 'styled-components';

import breaks from 'remark-breaks';
import Markdown from 'react-markdown';

import { Button, Modal } from '@kocherga/frontkit';

import {
  useFocusOnFirstModalRender,
  useCommonHotkeys,
} from '../../common/hooks';

import { LocalEvent } from '../types';

interface Props {
  isOpen: boolean;
  event: LocalEvent;
  onClose: () => void;
  onEdit: (e: LocalEvent) => void;
}

const EventTitle = styled.header`
  font-size: 1.6em;
  line-height: 1;
  margin-bottom: 10px;
`;

const EventRoom = styled.div``;

const EventDescription = styled.div`
  border-top: 1px solid #ddd;
  margin-top: 20px;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const EventAnnouncements = ({ event }: { event: LocalEvent }) => {
  if (!event.posted_vk && !event.posted_fb && !event.posted_timepad) {
    return null;
  }

  return (
    <div>
      <strong>Анонсы:</strong>{' '}
      {event.posted_vk && <a href={event.posted_vk}>vk</a>}
      &nbsp;
      {event.posted_fb && <a href={event.posted_fb}>fb</a>}
      &nbsp;
      {event.posted_timepad && <a href={event.posted_timepad}>timepad</a>}
    </div>
  );
};

const ViewEventModal = ({ isOpen, onEdit, onClose, event }: Props) => {
  const focus = useFocusOnFirstModalRender();

  const hotkeys = useCommonHotkeys({
    onEscape: onClose,
  });

  const editCb = useCallback(
    () => {
      onEdit(event);
    },
    [event, onEdit]
  );

  return (
    <Modal isOpen={isOpen}>
      <Modal.Header toggle={onClose}>&nbsp;</Modal.Header>
      <Modal.Body ref={focus} {...hotkeys}>
        <EventTitle>{event.title}</EventTitle>
        <div>
          {event.start.format('dddd, DD MMMM')} ⋅ {event.start.format('HH:mm')}{' '}
          – {event.end.format('HH:mm')}
        </div>
        <EventRoom>{event.room}</EventRoom>
        {event.description && (
          <EventDescription>
            <Markdown source={event.description} plugins={[breaks]} />
          </EventDescription>
        )}
        <EventAnnouncements event={event} />
      </Modal.Body>
      <Modal.Footer>
        <Footer>
          <small>
            <a href={`https://evenman.team.kocherga.club/event/${event.id}`}>
              evenman
            </a>{' '}
            ⋅ <a href={`/admin/events/event/${event.id}`}>админка</a>
          </small>
          <Button onClick={editCb}>Редактировать</Button>
        </Footer>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewEventModal;
