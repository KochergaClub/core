import { useState, useCallback, useMemo } from 'react';

import { Button, Column, Modal, Input } from '@kocherga/frontkit';
import { AsyncButton } from '~/components';
import { useCommonHotkeys } from '~/common/hooks';
import { ReactSelect } from '../components/ui';

import EventPrototypeStore from '../stores/EventPrototypeStore';

interface Props {
  store: EventPrototypeStore;
}

const EventPrototypeAdd: React.FC<Props> = ({ store }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [weekday, setWeekday] = useState<number | undefined>(undefined);
  const [hour, setHour] = useState<number | undefined>(undefined);
  const [minute, setMinute] = useState<number | undefined>(undefined);
  const [length, setLength] = useState<number | undefined>(undefined);

  const openModal = useCallback(() => setIsOpen(true), []);

  const closeModal = useCallback(() => setIsOpen(false), []);

  const canCreate = useMemo(
    () =>
      title &&
      location &&
      weekday !== undefined &&
      hour !== undefined &&
      minute !== undefined &&
      length !== undefined,
    [title, location, weekday, hour, minute, length]
  );

  const create = useCallback(async () => {
    if (!canCreate) {
      return;
    }
    await store.create({
      title,
      location,
      weekday: weekday!,
      hour: hour!,
      minute: minute!,
      length: length!,
      active: true,
      timepad_prepaid_tickets: false,
    });
    closeModal();
  }, [
    store,
    closeModal,
    canCreate,
    title,
    location,
    weekday,
    hour,
    minute,
    length,
  ]);

  const updateTitle = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  }, []);

  const updateLocation = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocation(e.currentTarget.value);
    },
    []
  );

  const updateWeekday = useCallback((selectOption: any) => {
    setWeekday(parseInt(selectOption.value as string, 10));
  }, []);

  const updateHour = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setHour(parseInt(e.currentTarget.value, 10));
  }, []);

  const updateMinute = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setMinute(parseInt(e.currentTarget.value, 10));
  }, []);

  const updateLength = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLength(parseInt(e.currentTarget.value, 10));
  }, []);

  const hotkeys = useCommonHotkeys({
    onEscape: closeModal,
    onEnter: create,
  });

  const renderModal = () => {
    const weekdays = [
      'Понедельник',
      'Вторник',
      'Среда',
      'Четверг',
      'Пятница',
      'Суббота',
      'Воскресенье',
    ];

    if (!isOpen) {
      return null;
    }

    return (
      <Modal>
        <Modal.Header toggle={closeModal}>Создать прототип</Modal.Header>
        <Modal.Body {...hotkeys}>
          <Column stretch>
            <Input
              type="text"
              placeholder="Название"
              value={title}
              onChange={updateTitle}
            />
            <Input
              type="text"
              placeholder="Комната"
              value={location}
              onChange={updateLocation}
            />
            <ReactSelect
              placeholder="День недели"
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
            <Input
              type="number"
              placeholder="Час"
              value={hour}
              onChange={updateHour}
            />
            <Input
              type="number"
              placeholder="Минута"
              value={minute}
              onChange={updateMinute}
            />
            <Input
              type="number"
              placeholder="Продолжительность (в минутах)"
              value={length}
              onChange={updateLength}
            />
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

  return (
    <>
      <Button onClick={openModal}>Создать прототип</Button>
      {renderModal()}
    </>
  );
};

export default EventPrototypeAdd;
