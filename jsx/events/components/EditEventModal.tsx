import React, { useCallback, useState, useRef } from 'react';

import styled from 'styled-components';

import { apiCall } from '../../utils';
import { Event, LocalEvent, ServerEvent, serverEventToEvent } from '../types';

import { Button, Modal } from '@kocherga/frontkit';

import EventFields from './EventFields';

interface Props {
  isOpen: boolean;
  event: LocalEvent;
  onSave: (e: Event) => void;
  onClose: () => void;
  onDelete: (id: string) => void;
}

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const EditEventModal = ({
  isOpen,
  onSave,
  onDelete,
  onClose,
  event,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState(event.title);
  const [room, setRoom] = useState(event.room);

  const saveCb = useCallback(
    async () => {
      const json = (await apiCall(`event/${event.id}`, 'PATCH', {
        title,
        location: room,
      })) as ServerEvent;

      onSave(serverEventToEvent(json));
    },
    [event.id, title, room]
  );

  const deleteCb = useCallback(
    async () => {
      await apiCall(`event/${event.id}`, 'DELETE', undefined, false);
      onDelete(event.id);
    },
    [event.id]
  );

  if (!isOpen) {
    return null;
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpened={() => inputRef.current && inputRef.current.focus()}
      overflow="visible"
    >
      <Modal.Header toggle={onClose}>
        Редактировать событие {event.start.format('DD MMMM')}{' '}
        {event.start.format('HH:mm')}–{event.end.format('HH:mm')}
      </Modal.Header>
      <Modal.Body>
        <EventFields
          title={title}
          room={room}
          setTitle={setTitle}
          setRoom={setRoom}
        />
      </Modal.Body>
      <Modal.Footer>
        <Footer>
          <Button onClick={deleteCb} kind="danger">
            Удалить
          </Button>
          <Button onClick={saveCb} kind="primary">
            Сохранить
          </Button>
        </Footer>
      </Modal.Footer>
    </Modal>
  );
};

export default EditEventModal;
