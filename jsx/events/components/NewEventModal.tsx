import React, { useCallback, useState } from 'react';

import { utcToZonedTime } from 'date-fns-tz';

import { useCommonHotkeys, useAPI } from '../../common/hooks';
import { timezone, formatDate } from '../../common/utils';
import { Event } from '../types';
import { createEvent } from '../api';

import EventFields from './EventFields';

import { Button, ControlsFooter, Modal } from '@kocherga/frontkit';

interface Props {
  isOpen: boolean;
  start: Date;
  end: Date;
  onCreate: (e: Event) => void;
  onClose: () => void;
}

const NewEventModal = ({ isOpen, onCreate, onClose, start, end }: Props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [room, setRoom] = useState('');
  const [saving, setSaving] = useState(false);

  const api = useAPI();

  const saveDisabled = saving || !title.length;

  const create = useCallback(async () => {
    if (saveDisabled) {
      return;
    }

    setSaving(true);

    const event = await createEvent(api, {
      start,
      end,
      title,
      description,
      location: room,
    });
    onCreate(event);
  }, [api, title, description, room, start, end, saveDisabled, onCreate]);

  const hotkeys = useCommonHotkeys({
    onEnter: create,
    onEscape: onClose,
  });

  if (!isOpen) {
    return null;
  }

  const zonedStart = utcToZonedTime(start, timezone);
  const zonedEnd = utcToZonedTime(end, timezone);

  return (
    <Modal isOpen={isOpen} overflow="visible">
      <Modal.Header toggle={onClose}>
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
