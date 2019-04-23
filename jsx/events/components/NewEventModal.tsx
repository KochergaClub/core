import React, { useCallback, useState } from 'react';

import moment from 'moment';

import { apiCall, useCommonHotkeys } from '../../utils';
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
  const [description, setDescription] = useState('');
  const [room, setRoom] = useState('');
  const [saving, setSaving] = useState(false);

  const saveDisabled = saving || !title.length;

  const create = useCallback(
    async () => {
      if (saveDisabled) {
        return;
      }

      setSaving(true);
      const json = (await apiCall('events', 'POST', {
        start: start.toDate(),
        end: end.toDate(),
        title,
        description,
        location: room,
      })) as ServerEvent;

      const event = serverEventToEvent(json);
      onCreate(event);
    },
    [title, description, room, saveDisabled]
  );

  const hotkeys = useCommonHotkeys({
    onEnter: create,
    onEscape: onClose,
  });

  if (!isOpen) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} overflow="visible">
      <Modal.Header toggle={onClose}>
        Создать событие {moment(start).format('DD MMMM')}{' '}
        {moment(start).format('HH:mm')}–{moment(end).format('HH:mm')}
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
