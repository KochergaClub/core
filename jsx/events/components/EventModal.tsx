import React, { useCallback, useContext, useState, useRef } from 'react';

import moment from 'moment';
import Select from 'react-select';

import { apiCall } from '../../utils';

import { Button, Modal } from '@kocherga/frontkit';

import { EventDispatch } from '../contexts';

interface Props {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  start: Date;
  end: Date;
}

const roomOptions = [
  { value: '', label: '(не выбрана)' },
  { value: 'Лекционная', label: 'Лекционная' },
  { value: 'Летняя', label: 'Летняя' },
  { value: 'ГЭБ', label: 'ГЭБ' },
  { value: 'Китайская', label: 'Китайская' },
];

const EventModal = ({ isOpen, setOpen, start, end }: Props) => {
  const dispatch = useContext(EventDispatch);
  const inputRef = useRef(null);

  const [title, setTitle] = useState('');
  const [room, setRoom] = useState(roomOptions[0]);

  const create = useCallback(
    async () => {
      const json = await apiCall('events', 'POST', {
        start,
        end,
        title,
        location: room.value,
      });

      dispatch({
        type: 'CREATE',
        payload: {
          start: moment(json.start),
          end: moment(json.end),
          title: json.title,
          room: json.location,
          id: json.id,
        },
      });
      setOpen(false);
    },
    [title, room]
  );

  if (!isOpen) {
    return null;
  }

  return (
    <Modal isOpen={isOpen} onOpened={() => inputRef.current.focus()}>
      <Modal.Header toggle={() => setOpen(!isOpen)}>
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
          onChange={selected => setRoom(selected)}
          options={roomOptions}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={create}>Создать</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventModal;
