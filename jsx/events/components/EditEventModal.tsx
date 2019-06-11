import React, { useCallback, useState } from 'react';

import styled from 'styled-components';

import { utcToZonedTime } from 'date-fns-tz';

import { useCommonHotkeys, useAPI } from '../../common/hooks';
import { timezone, formatDate } from '../../common/utils';
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

  const api = useAPI();

  const saveDisabled = deleting || saving || !title.length;

  const saveCb = useCallback(async () => {
    if (saveDisabled) {
      return;
    }
    setSaving(true);
    const json = (await api.call(`event/${event.id}`, 'PATCH', {
      title,
      description,
      location: room,
    })) as ServerEvent;

    onSave(serverEventToEvent(json));
  }, [api, onSave, event.id, saveDisabled, title, description, room]);

  const deleteCb = useCallback(async () => {
    setDeleting(true);
    await api.call(`event/${event.id}`, 'DELETE', undefined, false);
    onDelete(event.id);
  }, [api, onDelete, event.id]);

  const hotkeys = useCommonHotkeys({
    onEscape: onClose,
    onEnter: saveCb,
  });

  if (!isOpen) {
    return null;
  }

  const zonedStart = utcToZonedTime(event.start, timezone);
  const zonedEnd = utcToZonedTime(event.end, timezone);

  return (
    <Modal isOpen={isOpen} overflow="visible">
      <Modal.Header toggle={onClose}>
        Редактировать событие {formatDate(zonedStart, 'd MMMM HH:mm')}–
        {formatDate(zonedEnd, 'HH:mm')}
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
