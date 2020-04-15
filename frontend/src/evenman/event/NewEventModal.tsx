import { useState, useCallback } from 'react';
import { setHours, setMinutes, addHours } from 'date-fns';
import Router from 'next/router';

import { Modal, Column, ControlsFooter, Input } from '@kocherga/frontkit';

import { AsyncButton } from '~/components';
import { useCommonHotkeys, useNotification } from '~/common/hooks';

import { useEvenmanEventCreateMutation } from './queries.generated';
import { eventRoute } from '../routes';

interface Props {
  close: () => void;
  date: string;
}

const NewEventModal: React.FC<Props> = props => {
  const notify = useNotification();
  const [createMutation] = useEvenmanEventCreateMutation({
    refetchQueries: ['EvenmanEvents'],
    awaitRefetchQueries: true,
  });

  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');

  const isValid =
    title &&
    Boolean(time.match(/^\d\d:(00|30)$/)) &&
    Boolean(props.date.match(/^\d\d\d\d-\d\d-\d\d$/));

  const create = useCallback(async () => {
    if (!isValid) {
      return;
    }

    const match = time.match(/^(\d\d):(\d\d)$/);
    if (!match) {
      return;
    }
    const hour = parseInt(match[1], 10);
    const minute = parseInt(match[2], 10);

    const start = setHours(setMinutes(new Date(props.date), minute), hour);
    const end = addHours(start, 2);

    const result = await createMutation({
      variables: {
        title,
        start: start.toISOString(),
        end: end.toISOString(),
      },
    });
    if (!result.data) {
      notify({ text: 'Failed to create event', type: 'Error' });
      return;
    }
    props.close();

    const route = eventRoute(result.data.result.event.id);
    Router.push(route.href, route.as);
  }, [notify, createMutation, title, props, isValid, time]);

  const hotkeys = useCommonHotkeys({
    onEscape: props.close,
    onEnter: create,
  });

  return (
    <Modal>
      <Modal.Header toggle={props.close}>
        Новое событие на {props.date}
      </Modal.Header>
      <Modal.Body {...hotkeys}>
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
