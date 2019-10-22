import React, { useCallback } from 'react';

import styled from 'styled-components';

import { FaExternalLinkAlt } from 'react-icons/fa';

import { A, Button, Modal, Row } from '@kocherga/frontkit';

import { useFocusOnFirstModalRender, useCommonHotkeys } from '~/common/hooks';

import { LocalEvent } from '../types';

import EventInfo from './EventInfo';

interface Props {
  isOpen: boolean;
  event: LocalEvent;
  onClose: () => void;
  onEdit: (e: LocalEvent) => void;
}

const EventTitle = styled.header`
  font-size: 1.6em;
  line-height: 1;
  margin-bottom: 10px;
`;

const ExpandLink: React.FC<{ href: string }> = ({ href }) => (
  <A href={href} target="_blank">
    <FaExternalLinkAlt />
  </A>
);

const ViewEventModal = ({ isOpen, onEdit, onClose, event }: Props) => {
  const focus = useFocusOnFirstModalRender();

  const hotkeys = useCommonHotkeys({
    onEscape: onClose,
  });

  const editCb = useCallback(() => {
    onEdit(event);
  }, [event, onEdit]);

  return (
    <Modal isOpen={isOpen}>
      <Modal.Header toggle={onClose}>&nbsp;</Modal.Header>
      <Modal.Body ref={focus} {...hotkeys}>
        <EventTitle>{event.title}</EventTitle>
        <EventInfo event={event} />
      </Modal.Body>
      <Modal.Footer>
        <Row vCentered spaced>
          <small>
            <Row vCentered>
              <A href={`https://evenman.team.kocherga.club/event/${event.id}`}>
                evenman
              </A>
              <span> ⋅ </span>
              <ExpandLink href={`/team/events/view/${event.id}`} />
            </Row>
          </small>
          <Button onClick={editCb}>Редактировать</Button>
        </Row>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewEventModal;
