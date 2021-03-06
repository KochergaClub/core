import React, { useCallback, useMemo, useState } from 'react';

import { useMutation } from '@apollo/client';

import { useCommonHotkeys, useFocusOnFirstModalRender } from '~/common/hooks';
import { AsyncButton, Column, ControlsFooter, Input, Label, Modal } from '~/frontkit';

import TimePicker from '../common/TimePicker';
import { EvenmanPrototypeCreateDocument } from './queries.generated';
import WeekdayPicker from './WeekdayPicker';

interface Props {
  close: () => void;
}

const NewPrototypeModal: React.FC<Props> = ({ close }) => {
  const [createMutation] = useMutation(EvenmanPrototypeCreateDocument, {
    refetchQueries: ['EvenmanPrototypes'],
    awaitRefetchQueries: true,
  });

  const [title, setTitle] = useState('');
  const [weekday, setWeekday] = useState<number | undefined>(undefined);
  const [time, setTime] = useState<
    { hour: number; minute: number } | undefined
  >();
  const [length, setLength] = useState(120);

  const canCreate = useMemo(
    () =>
      title &&
      weekday !== undefined &&
      time !== undefined &&
      length !== undefined,
    [title, weekday, time, length]
  );

  const create = useCallback(async () => {
    if (!canCreate) {
      return;
    }
    if (time === undefined || weekday === undefined) {
      return; // shouldn't happen, but this satisfies typescript
    }
    await createMutation({
      variables: {
        title,
        weekday,
        hour: time.hour,
        minute: time.minute,
        length,
      },
    });
    close();
  }, [createMutation, close, canCreate, title, weekday, time, length]);

  const updateTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  }, []);

  const updateLength = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLength(parseInt(e.currentTarget.value, 10));
  }, []);

  const hotkeys = useCommonHotkeys({
    onEscape: close,
    onEnter: create,
  });

  const focus = useFocusOnFirstModalRender();

  return (
    <Modal>
      <Modal.Header close={close}>Создать прототип</Modal.Header>
      <Modal.Body {...hotkeys}>
        <Column stretch>
          <Label>Название:</Label>
          <Input
            type="text"
            placeholder="Название"
            value={title}
            onChange={updateTitle}
            ref={focus}
          />
          <Label>День недели:</Label>
          <WeekdayPicker value={weekday} setValue={setWeekday} />
          <Label>Время:</Label>
          <TimePicker time={time} setTime={setTime} />
          <Label>Продолжительность в минутах:</Label>
          <Input type="number" value={length} onChange={updateLength} />
        </Column>
      </Modal.Body>
      <Modal.Footer>
        <ControlsFooter>
          <AsyncButton act={create} disabled={!canCreate} kind="primary">
            Создать
          </AsyncButton>
        </ControlsFooter>
      </Modal.Footer>
    </Modal>
  );
};

export default NewPrototypeModal;
