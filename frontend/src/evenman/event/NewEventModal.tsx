import { useState, useCallback } from 'react';

import { Modal, Column, ControlsFooter, Input } from '@kocherga/frontkit';
import { AsyncButton } from '~/components';

import { useRootStore } from '../common';

interface Props {
  close: () => void;
  date: string;
}

const NewEventModal: React.FC<Props> = props => {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');

  const root = useRootStore();

  const isValid =
    title &&
    Boolean(time.match(/^\d\d:(00|30)$/)) &&
    Boolean(props.date.match(/^\d\d\d\d-\d\d-\d\d$/));

  const getEndTime = useCallback(() => {
    const match = time.match(/^(\d\d):(\d\d)$/);
    if (!match) {
      return;
    }
    const hour = match[1];
    const minute = match[2];
    return String(parseInt(hour, 10) + 2).padStart(2, '0') + ':' + minute;
  }, [time]);

  const serialize = useCallback(() => {
    if (!isValid) {
      return;
    }
    const endTime = getEndTime();
    if (!endTime) {
      return; // shouldn't happen, but this makes typescript happy
    }
    return {
      title,
      date: props.date,
      startTime: time,
      endTime,
    };
  }, [getEndTime, isValid, props, title, time]);

  const create = useCallback(async () => {
    if (!isValid) {
      return;
    }
    const createParams = serialize();
    if (!createParams) {
      return; // throw exception?
    }
    await root.eventStore.createEvent(createParams);
    props.close();
  }, [root, props, isValid, serialize]);

  return (
    <Modal>
      <Modal.Header toggle={props.close}>
        Новое событие на {props.date}
      </Modal.Header>
      <Modal.Body>
        <Column stretch>
          <label>Название события</label>
          <Input
            type="text"
            value={title}
            onChange={e => setTitle(e.currentTarget.value)}
          />
          <label>Время (xx:00 или xx:30)</label>
          <Input
            type="time"
            placeholder="ЧЧ:ММ"
            value={time}
            onChange={e => setTime(e.currentTarget.value)}
          />
        </Column>
      </Modal.Body>
      <Modal.Footer>
        <ControlsFooter>
          <AsyncButton act={create} kind="primary" disabled={!isValid}>
            Создать
          </AsyncButton>
        </ControlsFooter>
      </Modal.Footer>
    </Modal>
  );
};

export default NewEventModal;
