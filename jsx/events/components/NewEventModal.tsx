import React, { useCallback, useState } from 'react';

import moment from 'moment';

import { apiCall } from '../../utils';
import { Event, ServerEvent, serverEventToEvent } from '../types';

import EventFields from './EventFields';

import { Button, ControlsFooter, Modal } from '@kocherga/frontkit';

interface Props {
  isOpen: boolean;
  start: moment.Moment;
  end: moment.Moment;
  onCreate: (e: Event) => void;
  onClose: () => void;
}

const NewEventModal = ({ isOpen, onCreate, onClose, start, end }: Props) => {
  const [title, setTitle] = useState('');
  const [room, setRoom] = useState('');
  const [saving, setSaving] = useState(false);

  const create = useCallback(
    async () => {
      setSaving(true);
      const json = (await apiCall('events', 'POST', {
        start: start.toDate(),
        end: end.toDate(),
        title,
        location: room,
      })) as ServerEvent;

      const event = serverEventToEvent(json);
      onCreate(event);
    },
    [title, room]
  );

  const keypress = useCallback(
    (e: React.KeyboardEvent<HTMLElement>) => {
      if (e.keyCode === 13) {
        create();
      } else if (e.keyCode === 27) {
        onClose();
      }
    },
    [create, onClose]
  );

  if (!isOpen) {
    return null;
  }

  const saveDisabled = saving || !title.length;

  return (
    <Modal isOpen={isOpen} overflow="visible">
      <Modal.Header toggle={onClose}>
        Создать событие {moment(start).format('DD MMMM')}{' '}
        {moment(start).format('HH:mm')}–{moment(end).format('HH:mm')}
      </Modal.Header>
      <Modal.Body>
        <div tabIndex={0} onKeyDown={keypress}>
          <EventFields
            title={title}
            room={room}
            setTitle={setTitle}
            setRoom={setRoom}
            disabled={saving}
          />
        </div>
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
