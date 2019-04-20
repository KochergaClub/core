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

  const create = useCallback(
    async () => {
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

  if (!isOpen) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} overflow="visible">
      <Modal.Header toggle={onClose}>
        Создать событие {moment(start).format('DD MMMM')}{' '}
        {moment(start).format('HH:mm')}–{moment(end).format('HH:mm')}
      </Modal.Header>
      <Modal.Body>
        <EventFields
          title={title}
          room={room}
          setTitle={setTitle}
          setRoom={setRoom}
        />
      </Modal.Body>
      <Modal.Footer>
        <ControlsFooter>
          <Button onClick={create} kind="primary">
            Создать
          </Button>
        </ControlsFooter>
      </Modal.Footer>
    </Modal>
  );
};

export default NewEventModal;
