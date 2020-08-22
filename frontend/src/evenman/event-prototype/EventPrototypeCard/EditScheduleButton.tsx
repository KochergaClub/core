import { getHours, getMinutes, setHours, setMinutes } from 'date-fns';
import { useCallback, useState } from 'react';

import { Button, Column, ControlsFooter, Input, Label, Modal } from '@kocherga/frontkit';

import { useCommonHotkeys, useFocusOnFirstModalRender } from '~/common/hooks';
import { AsyncButton } from '~/components';

import { EventsPrototypeFragment } from '../queries.generated';
import TimePicker from '../TimePicker';
import WeekdayPicker from '../WeekdayPicker';
import { useUpdateMutation } from './hooks';

interface Props {
  prototype: EventsPrototypeFragment;
}

interface ModalProps extends Props {
  close: () => void;
}

const EditScheduleModal: React.FC<ModalProps> = ({ prototype, close }) => {
  const [weekday, setWeekday] = useState(prototype.weekday);
  const [time, setTime] = useState(() =>
    setHours(setMinutes(new Date(), prototype.minute), prototype.hour)
  );
  const [length, setLength] = useState(prototype.length);

  const updateLength = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLength(parseInt(e.currentTarget.value, 10));
  }, []);

  const updateMutation = useUpdateMutation(prototype.id);
  const saveCb = useCallback(async () => {
    const hour = getHours(time);
    const minute = getMinutes(time);
    await updateMutation({
      weekday,
      length,
      hour,
      minute,
    });
    close();
  }, [weekday, length, time, close]);

  const hotkeys = useCommonHotkeys({
    onEscape: close,
    onEnter: saveCb,
  });

  const focus = useFocusOnFirstModalRender();

  return (
    <Modal>
      <Modal.Header toggle={close}>Редактировать расписание</Modal.Header>
      <Modal.Body {...hotkeys}>
        <Column stretch>
          <Label>День недели:</Label>
          <WeekdayPicker value={weekday} setValue={setWeekday} />
          <TimePicker time={time} setTime={setTime} />
          <Label>Продолжительность в минутах:</Label>
          <Input
            type="number"
            value={length}
            onChange={updateLength}
            ref={focus}
          />
        </Column>
      </Modal.Body>
      <Modal.Footer>
        <ControlsFooter>
          <AsyncButton act={saveCb} kind="primary">
            Сохранить
          </AsyncButton>
        </ControlsFooter>
      </Modal.Footer>
    </Modal>
  );
};

const EditScheduleButton: React.FC<Props> = ({ prototype }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback(() => setIsOpen(true), []);

  const closeModal = useCallback(() => setIsOpen(false), []);

  return (
    <>
      {isOpen && <EditScheduleModal prototype={prototype} close={closeModal} />}
      <Button size="small" onClick={openModal}>
        Редактировать
      </Button>
    </>
  );
};

export default EditScheduleButton;
