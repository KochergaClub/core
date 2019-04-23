import React, { useCallback } from 'react';

import styled from 'styled-components';

import breaks from 'remark-breaks';
import Markdown from 'react-markdown';

import { Button, Modal } from '@kocherga/frontkit';

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
  font-size: 1.3em;
  line-height: 1.6em;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
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
        {event.description && (
          <Markdown source={event.description} plugins={[breaks]} />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Footer>
          <small>
            <a href={`https://evenman.team.kocherga.club/event/${event.id}`}>
              Посмотреть в evenman
            </a>
          </small>
          <Button onClick={editCb}>Редактировать</Button>
        </Footer>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewEventModal;
