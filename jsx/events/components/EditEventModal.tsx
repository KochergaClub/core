import { useCallback, useState } from 'react';

import { utcToZonedTime } from 'date-fns-tz';

import { useCommonHotkeys, useAPI } from '../../common/hooks';
import { timezone, formatDate } from '../../common/utils';
import { Event, LocalEvent } from '../types';
import { deleteEvent, patchEvent } from '../api';

import { Button, Modal, Row } from '@kocherga/frontkit';

import EventFields from './EventFields';

interface Props {
  isOpen: boolean;
  event: LocalEvent;
  onSave: (e: Event) => void;
  onClose: () => void;
  onDelete: (id: string) => void;
}

const EditEventModal: React.FC<Props> = ({
  isOpen,
  onSave,
  onDelete,
  onClose,
  event,
}) => {
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

    const patchedEvent = await patchEvent(api, event, {
      title,
      description,
      location: room,
    });

    onSave(patchedEvent);
  }, [api, onSave, event.id, saveDisabled, title, description, room]);

  const deleteCb = useCallback(async () => {
    setDeleting(true);
    await deleteEvent(api, event);
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
    <Modal>
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
        <Row spaced>
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
        </Row>
      </Modal.Footer>
    </Modal>
  );
};

export default EditEventModal;
