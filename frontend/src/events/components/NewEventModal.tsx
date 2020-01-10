import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { utcToZonedTime } from 'date-fns-tz';

import { Button, ControlsFooter, Modal } from '@kocherga/frontkit';

import { useCommonHotkeys, useDispatch } from '~/common/hooks';
import { timezone, formatDate } from '~/common/utils';

import { createEvent } from '~/events/features/events';
import { closeUI, selectRangeForNewEvent } from '~/events/features/calendarUI';

import EventFields from './EventFields';

const NewEventModal: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [room, setRoom] = useState('');
  const [saving, setSaving] = useState(false);

  const dispatch = useDispatch();
  const { start, end } = useSelector(selectRangeForNewEvent);

  const saveDisabled = saving || !title.length;

  const create = useCallback(async () => {
    if (saveDisabled) {
      return;
    }

    setSaving(true);

    await dispatch(
      createEvent({
        start,
        end,
        title,
        description,
        location: room,
      })
    );
    dispatch(closeUI());
  }, [dispatch, title, description, room, start, end, saveDisabled]);

  const closeCb = useCallback(() => {
    dispatch(closeUI());
  }, [dispatch]);

  const hotkeys = useCommonHotkeys({
    onEnter: create,
    onEscape: closeCb,
  });

  const zonedStart = utcToZonedTime(start, timezone);
  const zonedEnd = utcToZonedTime(end, timezone);

  return (
    <Modal>
      <Modal.Header toggle={closeCb}>
        Создать событие {formatDate(zonedStart, 'd MMMM HH:mm')}–
        {formatDate(zonedEnd, 'HH:mm')}
      </Modal.Header>
      <Modal.Body {...hotkeys}>
        <EventFields
          title={title}
          description={description}
          room={room}
          setTitle={setTitle}
          setRoom={setRoom}
          setDescription={setDescription}
          disabled={saving}
        />
      </Modal.Body>
      <Modal.Footer>
        <ControlsFooter>
          <Button
            onClick={create}
            kind="primary"
            loading={saving}
            disabled={saveDisabled}
          >
            Создать
          </Button>
        </ControlsFooter>
      </Modal.Footer>
    </Modal>
  );
};

export default NewEventModal;
