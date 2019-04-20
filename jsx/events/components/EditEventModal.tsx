import React, { useCallback, useState, useRef } from 'react';

import { apiCall } from '../../utils';
import { Event, LocalEvent, ServerEvent, serverEventToEvent } from '../types';

import { Button, Modal } from '@kocherga/frontkit';

interface Props {
  isOpen: boolean;
  event: LocalEvent;
  onSave: (e: Event) => void;
  onClose: () => void;
  onDelete: (id: string) => void;
}

const EditEventModal = ({
  isOpen,
  onSave,
  onDelete,
  onClose,
  event,
}: Props) => {
  const inputRef = useRef(null);

  const [title, setTitle] = useState('');

  const saveCb = useCallback(
    async () => {
      const json = (await apiCall(`event/${event.id}`, 'PATCH', {
        title,
      })) as ServerEvent;

      onSave(serverEventToEvent(json));
    },
    [event.id, title]
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
    <Modal isOpen={isOpen} onOpened={() => inputRef.current.focus()}>
      <Modal.Header toggle={onClose}>
        Редактировать событие {event.start.format('DD MMMM')}{' '}
        {event.start.format('HH:mm')}–{event.end.format('HH:mm')}
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          placeholder="Название события"
          ref={inputRef}
          defaultValue={event.title}
          onChange={e => setTitle(e.currentTarget.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={deleteCb}>Удалить</Button>
        <Button onClick={saveCb}>Сохранить</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditEventModal;
