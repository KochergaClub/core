import React, { useEffect, useRef } from 'react';

import Select from 'react-select';

import { Column, Input } from '@kocherga/frontkit';

const roomOptions = [
  { value: '', label: '(не выбрана)' },
  { value: 'Лекционная', label: 'Лекционная' },
  { value: 'Летняя', label: 'Летняя' },
  { value: 'ГЭБ', label: 'ГЭБ' },
  { value: 'Китайская', label: 'Китайская' },
];

const findRoom = (room: string) => {
  return roomOptions.find(el => el.value.toLowerCase() === room.toLowerCase());
};

interface Props {
  title: string;
  room: string;
  setTitle: (t: string) => void;
  setRoom: (t: string) => void;
}

const EventFields = (props: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(
    () => {
      // FIXME - this is bad (but better than nothing).
      // For some reason this code doesn't work without setTimeout. One possible suspect is Modal and its createPortal magic.
      setTimeout(() => {
        inputRef.current && inputRef.current.focus();
      }, 0);
    },
    [inputRef.current]
  );

  return (
    <Column stretch gutter={16}>
      <Column stretch gutter={0}>
        <label>Название события:</label>
        <Input
          type="text"
          placeholder="Название события"
          defaultValue={props.title}
          ref={inputRef}
          onChange={e => props.setTitle(e.currentTarget.value)}
        />
      </Column>
      <Column stretch gutter={0}>
        <label>Комната:</label>
        <Select
          value={findRoom(props.room)}
          onChange={(selected: { value: string; label: string }) =>
            props.setRoom(selected.value)
          }
          options={roomOptions}
        />
      </Column>
    </Column>
  );
};

export default EventFields;
