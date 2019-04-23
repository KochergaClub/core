import React, { useCallback } from 'react';

import styled from 'styled-components';

import { Button, ControlsFooter, Modal } from '@kocherga/frontkit';

import { useFocusOnFirstModalRender, useCommonHotkeys } from '../../utils';

import { LocalEvent } from '../types';

interface Props {
  isOpen: boolean;
  event: LocalEvent;
  onClose: () => void;
  onEdit: (e: LocalEvent) => void;
}

const EventTitle = styled.header`
  font-weight: bold;
`;

const ViewEventModal = ({ isOpen, onEdit, onClose, event }: Props) => {
  const focus = useFocusOnFirstModalRender();

  const hotkeys = useCommonHotkeys({
    onEscape: onClose,
  });

  const editCb = useCallback(
    () => {
      onEdit(event);
    },
    [event, onEdit]
  );

  return (
    <Modal isOpen={isOpen}>
      <Modal.Header toggle={onClose}>&nbsp;</Modal.Header>
      <Modal.Body ref={focus} {...hotkeys}>
        <EventTitle>{event.title}</EventTitle>
        <div>{event.room}</div>
        <div>
          {event.start.format('DD MMMM')}, {event.start.format('HH:mm')}-{event.end.format(
            'HH:mm'
          )}
        </div>
        <div>
          <a href={`https://evenman.team.kocherga.club/event/${event.id}`}>
            Посмотреть в evenman
          </a>
        </div>
        {event.description && (
          <>
            <hr />
            <div>{event.description}</div>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <ControlsFooter>
          <Button onClick={editCb}>Редактировать</Button>
        </ControlsFooter>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewEventModal;
