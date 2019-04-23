import React, { useCallback, useState } from 'react';

import styled from 'styled-components';

import { apiCall, useCommonHotkeys } from '../../utils';
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
  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [room, setRoom] = useState(event.room);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const saveDisabled = deleting || saving || !title.length;

  const saveCb = useCallback(
    async () => {
      if (saveDisabled) {
        return;
      }
      setSaving(true);
      const json = (await apiCall(`event/${event.id}`, 'PATCH', {
        title,
        description,
        location: room,
      })) as ServerEvent;

      onSave(serverEventToEvent(json));
    },
    [event.id, saveDisabled, title, description, room]
  );

  const deleteCb = useCallback(
    async () => {
      setDeleting(true);
      await apiCall(`event/${event.id}`, 'DELETE', undefined, false);
      onDelete(event.id);
    },
    [event.id]
  );

  const hotkeys = useCommonHotkeys({
    onEscape: onClose,
    onEnter: saveCb,
  });

  if (!isOpen) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} overflow="visible">
      <Modal.Header toggle={onClose}>
        Редактировать событие {event.start.format('DD MMMM')}{' '}
        {event.start.format('HH:mm')}–{event.end.format('HH:mm')}
      </Modal.Header>
      <Modal.Body {...hotkeys}>
        <EventFields
          title={title}
          description={description}
          room={room}
          setTitle={setTitle}
          setDescription={setDescription}
          setRoom={setRoom}
          disabled={deleting || saving}
        />
      </Modal.Body>
      <Modal.Footer>
        <Footer>
          <Button
            onClick={deleteCb}
            kind="danger"
            loading={deleting}
            disabled={deleting || saving}
          >
            Удалить
          </Button>
          <Button
            onClick={saveCb}
            kind="primary"
            loading={saving}
            disabled={saveDisabled}
          >
            Сохранить
          </Button>
        </Footer>
      </Modal.Footer>
    </Modal>
  );
};

export default EditEventModal;
