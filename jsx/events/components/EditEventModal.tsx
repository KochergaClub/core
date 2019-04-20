import React, { useCallback, useState, useRef } from 'react';

import { apiCall } from '../../utils';
import { Event, LocalEvent, ServerEvent, serverEventToEvent } from '../types';

import { Button, Modal } from '@kocherga/frontkit';

interface Props {
  isOpen: boolean;
  event: LocalEvent;
  onSave: (e: Event) => void;
  onClose: () => void;
}

const EditEventModal = ({ isOpen, onSave, onClose, event }: Props) => {
  const inputRef = useRef(null);

  const [title, setTitle] = useState('');

  const save = useCallback(
    async () => {
      const json = (await apiCall(`event/${event.id}`, 'PATCH', {
        title,
      })) as ServerEvent;

      onSave(serverEventToEvent(json));
    },
    [title]
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
        <Button onClick={save}>Сохранить</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditEventModal;
