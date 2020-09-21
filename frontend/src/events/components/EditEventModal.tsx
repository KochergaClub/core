import { utcToZonedTime } from 'date-fns-tz';
import { useCallback, useContext, useState } from 'react';

import { useMutation, useQuery } from '@apollo/client';
import { Button, Modal, Row } from '@kocherga/frontkit';

import { useCommonHotkeys } from '~/common/hooks';
import { formatDate, timezone } from '~/common/utils';
import { ApolloQueryResults } from '~/components';

import {
    TeamCalendarDeleteEventDocument, TeamCalendarEventDocument, TeamCalendarEventFragment,
    TeamCalendarUpdateEventDocument
} from '../queries.generated';
import { CalendarUIContext, closeUI } from '../reducers/calendarUI';
import EventFields from './EventFields';

interface LoadedProps {
  event: TeamCalendarEventFragment;
}

const EditEventModalLoaded: React.FC<LoadedProps> = ({ event }) => {
  const { dispatch } = useContext(CalendarUIContext);

  const [updateMutation] = useMutation(TeamCalendarUpdateEventDocument, {
    // TODO - update cache instead
    refetchQueries: ['EventsInRange'],
    awaitRefetchQueries: true,
  });
  const [deleteMutation] = useMutation(TeamCalendarDeleteEventDocument, {
    // TODO - update cache instead
    refetchQueries: ['EventsInRange'],
    awaitRefetchQueries: true,
  });

  const [title, setTitle] = useState(event.title);
  const [description, setDescription] = useState(event.description);
  const [room, setRoom] = useState(event.room);
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

    await updateMutation({
      variables: {
        id: event.id,
        title,
        description,
        location: room,
      },
    });
    dispatch(closeUI());
  }, [dispatch, event, saveDisabled, title, description, room, updateMutation]);

  const deleteCb = useCallback(async () => {
    if (!event) {
      return;
    }
    setDeleting(true);
    await deleteMutation({ variables: { id: event.id } });
    dispatch(closeUI());
  }, [dispatch, event, deleteMutation]);

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

interface Props {
  event_id: string;
}

const EditEventModal: React.FC<Props> = ({ event_id }) => {
  const queryResults = useQuery(TeamCalendarEventDocument, {
    variables: { id: event_id },
  });

  return (
    <Modal>
      <ApolloQueryResults {...queryResults}>
        {({ data: { event } }) =>
          event ? (
            <EditEventModalLoaded event={event} />
          ) : (
            <div>Событие не найдено</div> // TODO - better formatting (though this error shouldn't happen very often)
          )
        }
      </ApolloQueryResults>
    </Modal>
  );
};

export default EditEventModal;
