import { useCallback, useState } from 'react';

import { useCommonHotkeys, useFocusOnFirstModalRender } from '~/common/hooks';
import { AsyncButton, Button, Column, ControlsFooter, Input, Label, Modal } from '~/frontkit';

import TimePicker from '../../common/TimePicker';
import { EventsPrototypeFragment } from '../queries.generated';
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
  const [time, setTime] = useState({
    hour: prototype.hour,
    minute: prototype.minute,
  });
  const [length, setLength] = useState(prototype.length);

  const updateLength = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLength(parseInt(e.currentTarget.value, 10));
  }, []);

  const updateMutation = useUpdateMutation(prototype.id);
  const saveCb = useCallback(async () => {
    await updateMutation({
      weekday,
      length,
      hour: time.hour,
      minute: time.minute,
    });
    close();
  }, [weekday, length, time, close, updateMutation]);

  const hotkeys = useCommonHotkeys({
    onEscape: close,
    onEnter: saveCb,
  });

  const focus = useFocusOnFirstModalRender();

  return (
    <Modal>
      <Modal.Header close={close}>Редактировать расписание</Modal.Header>
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
