import 'react-datepicker/dist/react-datepicker.css';

import { addHours, getHours, getMinutes, parseISO, setHours, setMinutes } from 'date-fns';
import Router from 'next/router';
import { useCallback, useState } from 'react';
import DatePicker from 'react-datepicker';

import { useMutation } from '@apollo/client';

import { useCommonHotkeys, useFocusOnFirstModalRender, useNotification } from '~/common/hooks';
import { Button, Column, ControlsFooter, Input, Label, Modal } from '~/frontkit';

import { eventRoute } from '../routes';
import { EvenmanEventCreateDocument } from './queries.generated';

interface Props {
  close: () => void;
  date: string;
}

const NewEventModal: React.FC<Props> = (props) => {
  const notify = useNotification();
  const [createMutation, { loading: creating }] = useMutation(
    EvenmanEventCreateDocument,
    {
      refetchQueries: ['EvenmanEvents'],
      awaitRefetchQueries: true,
    }
  );

  const [title, setTitle] = useState('');
  const [time, setTime] = useState(new Date());

  const isValid = title && time;

  const changeTime = useCallback((newTime: Date) => {
    setTime(newTime);
  }, []);

  const create = useCallback(async () => {
    if (!isValid) {
      return;
    }

    const start = setHours(
      setMinutes(parseISO(props.date), getMinutes(time)),
      getHours(time)
    );
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
    Router.push(route);
  }, [notify, createMutation, title, props, isValid, time]);

  const hotkeys = useCommonHotkeys({
    onEscape: props.close,
    onEnter: create,
  });

  const focus = useFocusOnFirstModalRender();

  return (
    <Modal>
      <Modal.Header close={props.close}>
        Новое событие на {props.date}
      </Modal.Header>
      <Modal.Body {...hotkeys}>
        <Column stretch>
          <Label>Название события:</Label>
          <Input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.currentTarget.value)}
            ref={focus}
          />
          <DatePicker
            selected={time}
            onChange={changeTime}
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
        </Column>
      </Modal.Body>
      <Modal.Footer>
        <ControlsFooter>
          <Button
            onClick={create}
            kind="primary"
            loading={creating}
            disabled={!isValid || creating}
          >
            Создать
          </Button>
        </ControlsFooter>
      </Modal.Footer>
    </Modal>
  );
};

export default NewEventModal;
