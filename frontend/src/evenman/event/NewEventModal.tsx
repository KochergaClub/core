import 'react-datepicker/dist/react-datepicker.css';

import { addHours, parseISO, setHours, setMinutes } from 'date-fns';
import Router from 'next/router';
import { useCallback, useState } from 'react';

import { useMutation } from '@apollo/client';

import { useCommonHotkeys, useFocusOnFirstModalRender } from '~/common/hooks';
import { Button, Column, ControlsFooter, Input, Label, Modal, useNotification } from '~/frontkit';

import TimePicker from '../common/TimePicker';
import { evenmanEventRoute } from '../routes';
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
  const [time, setTime] = useState<
    { hour: number; minute: number } | undefined
  >();

  const isValid = title && time;

  const create = useCallback(async () => {
    if (!isValid) {
      return;
    }
    if (!time) {
      return; // shouldn't happen
    }

    const start = setHours(
      setMinutes(parseISO(props.date), time.minute),
      time.hour
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

    const route = evenmanEventRoute(result.data.result.event.id);
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
          <Label>Время:</Label>
          <TimePicker time={time} setTime={setTime} />
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
