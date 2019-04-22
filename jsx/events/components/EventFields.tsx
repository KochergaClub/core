import React, { useCallback, useEffect, useRef } from 'react';

import Select from 'react-select';
import autosize from 'autosize';

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

const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  const ref = useRef<HTMLTextAreaElement | null>(null);
  useEffect(() => {
    setTimeout(() => {
      ref.current && autosize(ref.current);
    }, 50); // timers are necessary because we use Modal with portals
    () => {
      ref.current && autosize.destroy(ref.current);
    };
  }, []);

  return <textarea {...props} rows={4} style={{ maxHeight: 200 }} ref={ref} />;
};

interface Props {
  title: string;
  description: string;
  room: string;
  setTitle: (t: string) => void;
  setDescription: (t: string) => void;
  setRoom: (t: string) => void;
  disabled?: boolean;
}

const EventFields = (props: Props) => {
  const firstRender = useRef(true);

  const setFocusOnFirstRender = useCallback((el: HTMLInputElement | null) => {
    if (firstRender.current) {
      firstRender.current = false; // focus only once, just to avoid nasty errors
      if (el) {
        setTimeout(() => el.focus(), 50); // timers are necessary because we use Modal with portals
      }
    }
  }, []);

  const onChangeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      props.setTitle(e.currentTarget.value);
    },
    [props.setTitle]
  );

  return (
    <Column stretch gutter={16}>
      <Column stretch gutter={0}>
        <label>Название события:</label>
        <Input
          type="text"
          placeholder="Название события"
          defaultValue={props.title}
          ref={setFocusOnFirstRender}
          onChange={onChangeTitle}
          disabled={props.disabled}
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
          isDisabled={props.disabled}
        />
      </Column>
      <Column stretch gutter={0}>
        <label>Описание:</label>
        <Textarea
          onChange={e => props.setDescription(e.currentTarget.value)}
          defaultValue={props.description}
          onKeyDown={e => e.keyCode == 13 && e.stopPropagation()}
          disabled={props.disabled}
        />
      </Column>
    </Column>
  );
};

export default EventFields;
