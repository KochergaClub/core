import { useCallback, useState, useContext } from 'react';

import { utcToZonedTime } from 'date-fns-tz';

import { Button, ControlsFooter, Modal } from '@kocherga/frontkit';

import { useCommonHotkeys } from '~/common/hooks';
import { timezone, formatDate } from '~/common/utils';

import EventFields from './EventFields';
import { CalendarUIContext, closeUI } from '../reducers/calendarUI';
import { useTeamCalendarCreateEventMutation } from '../queries.generated';

const NewEventModal: React.FC = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [room, setRoom] = useState('');
  const [saving, setSaving] = useState(false);

  const [createMutation] = useTeamCalendarCreateEventMutation({
    // TODO - update cache instead
    refetchQueries: ['EventsInRange'],
    awaitRefetchQueries: true,
  });

  const { dispatch, state } = useContext(CalendarUIContext);

  if (state.mode !== 'new') {
    throw new Error('Expected new mode');
  }
  const { start, end } = state.context;

  const saveDisabled = saving || !title.length;

  const create = useCallback(async () => {
    if (saveDisabled) {
      return;
    }

    setSaving(true);

    await createMutation({
      variables: {
        start: start.toISOString(),
        end: end.toISOString(),
        title,
        description,
        room,
      },
    });
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
