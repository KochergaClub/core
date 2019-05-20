import React, { useCallback } from 'react';

import styled from 'styled-components';

import breaks from 'remark-breaks';
import Markdown from 'react-markdown';

import { utcToZonedTime } from 'date-fns-tz';

import { A, Button, Modal, RichText } from '@kocherga/frontkit';

import {
  useFocusOnFirstModalRender,
  useCommonHotkeys,
} from '../../common/hooks';

import { timezone, formatDate } from '../../common/utils';
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
      {event.posted_vk && <A href={event.posted_vk}>vk</A>}
      &nbsp;
      {event.posted_fb && <A href={event.posted_fb}>fb</A>}
      &nbsp;
      {event.posted_timepad && <A href={event.posted_timepad}>timepad</A>}
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

  const zonedStart = utcToZonedTime(event.start, timezone);
  const zonedEnd = utcToZonedTime(event.end, timezone);

  return (
    <Modal isOpen={isOpen}>
      <Modal.Header toggle={onClose}>&nbsp;</Modal.Header>
      <Modal.Body ref={focus} {...hotkeys}>
        <EventTitle>{event.title}</EventTitle>
        <div>
          {formatDate(zonedStart, 'cccc, d MMMM')} ⋅{' '}
          {formatDate(zonedStart, 'HH:mm')} – {formatDate(zonedEnd, 'HH:mm')}
        </div>
        <EventRoom>{event.room}</EventRoom>
        {event.description && (
          <EventDescription>
            <RichText>
              <Markdown source={event.description} plugins={[breaks]} />
            </RichText>
          </EventDescription>
        )}
        <EventAnnouncements event={event} />
      </Modal.Body>
      <Modal.Footer>
        <Footer>
          <small>
            <A href={`https://evenman.team.kocherga.club/event/${event.id}`}>
              evenman
            </A>{' '}
            ⋅ <A href={`/admin/events/event/${event.id}`}>админка</A>
          </small>
          <Button onClick={editCb}>Редактировать</Button>
        </Footer>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewEventModal;
