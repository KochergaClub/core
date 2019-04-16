import React, { useCallback, useContext, useRef } from 'react';

import moment from 'moment';

import { CSRFTokenContext } from '../../components/Page';

import { Button, Modal } from '@kocherga/frontkit';

import { EventDispatch } from '../contexts';

interface Props {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
  start: Date;
  end: Date;
}

const EventModal = ({ isOpen, setOpen, start, end }: Props) => {
  const dispatch = useContext(EventDispatch);
  const csrfToken = useContext(CSRFTokenContext);
  const inputRef = useRef(null);

  const create = useCallback(async () => {
    const response = await fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken': csrfToken,
      },
      body: JSON.stringify({
        start: start,
        end: end,
        title: inputRef.current.value,
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      window.alert(`Error: ${JSON.stringify(body)}`);
      return;
    }

    const json = await response.json();

    dispatch({
      type: 'CREATE',
      payload: {
        start: moment(json.start),
        end: moment(json.end),
        title: json.title,
        id: json.id,
      },
    });
    setOpen(false);
  }, []);

  return (
    <Modal isOpen={isOpen} onOpened={() => inputRef.current.focus()}>
      <Modal.Header toggle={() => setOpen(!isOpen)}>
        Создать событие {moment(start).format('DD MMMM')}{' '}
        {moment(start).format('HH:mm')}–{moment(end).format('HH:mm')}
      </Modal.Header>
      <Modal.Body>
        <input type="text" placeholder="Название события" ref={inputRef} />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={create}>Создать</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventModal;
