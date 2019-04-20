import React, { useCallback, useState, useRef } from 'react';

import moment from 'moment';
import Select from 'react-select';

import { apiCall } from '../../utils';
import { Event, ServerEvent, serverEventToEvent } from '../types';

import { Button, Modal } from '@kocherga/frontkit';

interface Props {
  isOpen: boolean;
  start: moment.Moment;
  end: moment.Moment;
  onCreate: (e: Event) => void;
  onClose: () => void;
}

const roomOptions = [
  { value: '', label: '(не выбрана)' },
  { value: 'Лекционная', label: 'Лекционная' },
  { value: 'Летняя', label: 'Летняя' },
  { value: 'ГЭБ', label: 'ГЭБ' },
  { value: 'Китайская', label: 'Китайская' },
];

const NewEventModal = ({ isOpen, onCreate, onClose, start, end }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [room, setRoom] = useState(roomOptions[0]);

  const create = useCallback(
    async () => {
      const json = (await apiCall('events', 'POST', {
        start: start.toDate(),
        end: end.toDate(),
        title,
        location: room.value,
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
    <Modal
      isOpen={isOpen}
      onOpened={() => inputRef.current && inputRef.current.focus()}
    >
      <Modal.Header toggle={onClose}>
        Создать событие {moment(start).format('DD MMMM')}{' '}
        {moment(start).format('HH:mm')}–{moment(end).format('HH:mm')}
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          placeholder="Название события"
          ref={inputRef}
          onChange={e => setTitle(e.currentTarget.value)}
        />
        <Select
          value={room}
          onChange={(selected: { value: string; label: string }) =>
            setRoom(selected)
          }
          options={roomOptions}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={create}>Создать</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewEventModal;
