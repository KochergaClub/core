import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { utcToZonedTime } from 'date-fns-tz';

import { Button, Modal, Row } from '@kocherga/frontkit';

import { useCommonHotkeys, useDispatch } from '~/common/hooks';
import { timezone, formatDate } from '~/common/utils';

import { deleteEvent, patchEvent } from '../features/events';
import { closeUI, selectActiveEvent } from '../features/calendarUI';

import EventFields from './EventFields';

const EditEventModal: React.FC = () => {
  const dispatch = useDispatch();
  const event = useSelector(selectActiveEvent);

  const [title, setTitle] = useState(event?.title || '');
  const [description, setDescription] = useState(event?.description || '');
  const [room, setRoom] = useState(event?.room || '');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const saveDisabled = deleting || saving || !title || !title.length;

  const saveCb = useCallback(async () => {
    if (!event) {
      return;
    }
    if (saveDisabled) {
      return;
    }
    setSaving(true);

    await dispatch(
      patchEvent(event.id, {
        title,
        description,
        location: room,
      })
    );
    dispatch(closeUI());
  }, [dispatch, event, saveDisabled, title, description, room]);

  const deleteCb = useCallback(async () => {
    if (!event) {
      return;
    }
    setDeleting(true);
    await dispatch(deleteEvent(event.id));
    dispatch(closeUI());
  }, [dispatch, event]);

  const closeCb = useCallback(() => {
    dispatch(closeUI());
  }, [dispatch]);

  const hotkeys = useCommonHotkeys({
    onEscape: closeCb,
    onEnter: saveCb,
  });

  if (!event) {
    if (deleting) {
      return null; // that's ok, we're probably deleting it ourselves
    }
    dispatch(closeUI()); // somebody else deleted the event and we got websocket notification? probably...
    return null;
  }

  const zonedStart = utcToZonedTime(event.start, timezone);
  const zonedEnd = utcToZonedTime(event.end, timezone);

  return (
    <Modal>
      <Modal.Header toggle={closeCb}>
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
