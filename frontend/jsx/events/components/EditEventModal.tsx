import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { utcToZonedTime } from 'date-fns-tz';

import { Button, Modal, Row } from '@kocherga/frontkit';

import { useCommonHotkeys, useAPI } from '~/common/hooks';
import { timezone, formatDate } from '~/common/utils';
import { State } from '~/redux/store';

import { deleteEvent, patchEvent, selectEventById } from '../features/events';
import { closeUI } from '../features/calendarUI';

import EventFields from './EventFields';

interface Props {
  eventId: string;
}

const EditEventModal: React.FC<Props> = ({ eventId }) => {
  const dispatch = useDispatch();
  const event = useSelector((state: State) => selectEventById(state, eventId));

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

    await dispatch(
      patchEvent(event.id, {
        title,
        description,
        location: room,
      })
    );
    dispatch(closeUI());
  }, [api, event.id, saveDisabled, title, description, room]);

  const deleteCb = useCallback(async () => {
    setDeleting(true);
    await dispatch(deleteEvent(event.id));
    dispatch(closeUI());
  }, [api, event.id]);

  const closeCb = useCallback(() => {
    dispatch(closeUI());
  }, [dispatch]);

  const hotkeys = useCommonHotkeys({
    onEscape: closeCb,
    onEnter: saveCb,
  });

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
