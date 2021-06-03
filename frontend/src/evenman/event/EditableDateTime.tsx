import { formatDistanceToNow, getHours, getMinutes, setHours, setMinutes } from 'date-fns';
import { ru } from 'date-fns/locale';
import React, { useState } from 'react';

import { formatDate } from '~/common/utils';
import { DatePicker } from '~/components/DatePicker';
import { A, AsyncButton, ControlsFooter, Modal } from '~/frontkit';

import TimePicker from '../common/TimePicker';

interface Props {
  title?: string;
  date: Date;
  onChange: (d: Date) => Promise<unknown>;
}

const DateTimeModal: React.FC<Props & { close: () => void }> = ({
  date,
  onChange,
  title = 'Выберите дату и время',
  close,
}) => {
  const [selectedDate, setSelectedDate] = useState(date);
  const [selectedTime, setSelectedTime] = useState({
    hour: getHours(date), // FIXME - timezone
    minute: getMinutes(date), // FIXME - timezone
  });

  const save = async () => {
    const newDate = setHours(
      setMinutes(selectedDate, selectedTime.minute),
      selectedTime.hour
    );
    await onChange(newDate);
    close();
  };

  return (
    <Modal>
      <Modal.Header close={close}>{title}</Modal.Header>
      <Modal.Body>
        <div className="space-y-2">
          <DatePicker value={selectedDate} onChange={setSelectedDate} />
          <TimePicker time={selectedTime} setTime={setSelectedTime} />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <ControlsFooter>
          <AsyncButton kind="primary" act={save}>
            Сохранить
          </AsyncButton>
        </ControlsFooter>
      </Modal.Footer>
    </Modal>
  );
};

export const EditableDateTime: React.FC<Props> = (props) => {
  const [editing, setEditing] = useState(false);

  const open = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setEditing(true);
  };
  const close = () => {
    setEditing(false);
  };

  const { date } = props;

  return (
    <div className="flex space-x-1">
      {editing && <DateTimeModal {...props} close={close} />}
      <A href="" onClick={open}>
        <b>{formatDate(props.date, 'EEEEEE').toUpperCase()}</b>{' '}
        {formatDate(date, 'd MMMM, HH:mm')}
      </A>
      <div>({formatDistanceToNow(date, { locale: ru, addSuffix: true })})</div>
    </div>
  );
};
