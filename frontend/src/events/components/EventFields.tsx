import { useCallback, useEffect, useRef } from 'react';

import Select from 'react-select';
import autosize from 'autosize';

import { useFocusOnFirstModalRender } from '../../common/hooks';

import { Column, Input, Label } from '@kocherga/frontkit';

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

  return <textarea {...props} rows={4} style={{ width: '100%' }} ref={ref} />;
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
  const focus = useFocusOnFirstModalRender();

  const { setTitle } = props;

  const onChangeTitle = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value);
    },
    [setTitle]
  );

  return (
    <Column stretch gutter={16}>
      <Column stretch gutter={0}>
        <Label>Название события</Label>
        <Input
          type="text"
          placeholder="Название события"
          defaultValue={props.title}
          ref={focus}
          onChange={onChangeTitle}
          disabled={props.disabled}
        />
      </Column>
      <Column stretch gutter={0}>
        <Label>Комната</Label>
        <Select
          value={findRoom(props.room)}
          onChange={(selected: any) => {
            // FIXME - fix type
            if (selected && !Array.isArray(selected)) {
              props.setRoom(selected.value);
            } // TODO - else?
          }}
          options={roomOptions}
          isDisabled={props.disabled}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: provided => ({ ...provided, zIndex: 1100 }),
          }}
        />
      </Column>
      <Column stretch gutter={0}>
        <Label>Описание</Label>
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
