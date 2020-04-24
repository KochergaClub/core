import { useState, useCallback, useMemo } from 'react';
import DatePicker from 'react-datepicker';
import { getHours, getMinutes, setHours, setMinutes } from 'date-fns';

import { Column, Label, Modal, Input } from '@kocherga/frontkit';

import { AsyncButton } from '~/components';
import { useCommonHotkeys, useFocusOnFirstModalRender } from '~/common/hooks';
import { ReactSelect } from '../components/ui';

import { useEvenmanPrototypeCreateMutation } from './queries.generated';

interface Props {
  close: () => void;
}

const NewPrototypeModal: React.FC<Props> = ({ close }) => {
  const [createMutation] = useEvenmanPrototypeCreateMutation({
    refetchQueries: ['EvenmanPrototypes'],
    awaitRefetchQueries: true,
  });

  const [title, setTitle] = useState('');
  const [weekday, setWeekday] = useState<number | undefined>(undefined);
  const [time, setTime] = useState<Date | undefined>();
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
    const hour = getHours(time!);
    const minute = getMinutes(time!);
    await createMutation({
      variables: {
        title,
        weekday: weekday!,
        hour,
        minute,
        length: length!,
      },
    });
    close();
  }, [createMutation, close, canCreate, title, weekday, time, length]);

  const updateTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  }, []);

  const updateWeekday = useCallback((selectOption: any) => {
    setWeekday(parseInt(selectOption.value as string, 10));
  }, []);

  const updateTime = useCallback((newTime: Date) => {
    setTime(newTime);
  }, []);

  const updateLength = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLength(parseInt(e.currentTarget.value, 10));
  }, []);

  const hotkeys = useCommonHotkeys({
    onEscape: close,
    onEnter: create,
  });

  const focus = useFocusOnFirstModalRender();

  const weekdays = [
    'Понедельник',
    'Вторник',
    'Среда',
    'Четверг',
    'Пятница',
    'Суббота',
    'Воскресенье',
  ];

  return (
    <Modal>
      <Modal.Header toggle={close}>Создать прототип</Modal.Header>
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
          <ReactSelect
            placeholder="Выбрать..."
            menuPortalTarget={document.body}
            styles={{
              menuPortal: (base: any) => ({ ...base, zIndex: 1500 }),
            }}
            options={[0, 1, 2, 3, 4, 5, 6].map(n => ({
              value: n,
              label: weekdays[n],
            }))}
            value={
              weekday === undefined
                ? null
                : { value: weekday, label: weekdays[weekday] }
            }
            onChange={updateWeekday}
          />
          <DatePicker
            selected={time}
            onChange={updateTime}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            minTime={setHours(setMinutes(new Date(), 0), 9)}
            maxTime={setHours(setMinutes(new Date(), 30), 23)}
            timeCaption="Время"
            dateFormat="HH:mm"
            timeFormat="HH:mm"
            inline
          />
          <Label>Продолжительность в минутах:</Label>
          <Input type="number" value={length} onChange={updateLength} />
        </Column>
      </Modal.Body>
      <Modal.Footer>
        <AsyncButton act={create} disabled={!canCreate} kind="primary">
          Создать
        </AsyncButton>
      </Modal.Footer>
    </Modal>
  );
};

export default NewPrototypeModal;
