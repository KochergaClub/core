import React, { useCallback, useRef, useState } from 'react';
import { FaGlobeAfrica, FaLock } from 'react-icons/fa';
import styled from 'styled-components';
import useOnClickOutside from 'use-onclickoutside';

import { A, Button, Column, Row } from '@kocherga/frontkit';

import { NumberBadge } from '../components/ui';
import {
    EvenmanUnknownEventFragment, useEvenmanSetEventTypeMutation, useEvenmanUnknownEventsQuery
} from './queries.generated';

const Container = styled.div`
  position: relative;
`;

const ListContainer = styled.div`
  position: absolute;
  top: 20px;
  border: 1px solid #aaa;
  box-shadow: 4px 4px 4px #999;
  background: white;
  padding: 4px 8px;
  min-width: 300px;
  z-index: 5;
`;

const ControlButton = styled(Button)`
  width: 40px;
`;

const ListItem = ({ event }: { event: EvenmanUnknownEventFragment }) => {
  const [setEventType] = useEvenmanSetEventTypeMutation();

  const setPublic = useCallback(() => {
    setEventType({
      variables: {
        id: event.id,
        event_type: 'public',
      },
    });
  }, [event.id, setEventType]);

  const setPrivate = useCallback(() => {
    setEventType({
      variables: {
        id: event.id,
        event_type: 'private',
      },
    });
  }, [event.id, setEventType]);

  return (
    <Row stretch spaced>
      <small>{event.title}</small>
      <Row>
        <ControlButton onClick={setPublic}>
          <FaGlobeAfrica style={{ color: 'green' }} />
        </ControlButton>
        <ControlButton onClick={setPrivate}>
          <FaLock style={{ color: 'red' }} />
        </ControlButton>
      </Row>
    </Row>
  );
};

const UnknownEventsDropdown: React.FC = () => {
  const queryResults = useEvenmanUnknownEventsQuery();

  const [expanded, setExpanded] = useState(false);

  const toggle = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      setExpanded(!expanded);
    },
    [expanded]
  );

  const unexpand = useCallback((e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    setExpanded(false);
  }, []);

  const ref = useRef<HTMLDivElement>(null);

  useOnClickOutside(ref, unexpand);

  if (!queryResults.data) {
    return null;
  }

  const events = queryResults.data.events.nodes;

  const renderList = () => {
    return (
      <ListContainer ref={ref}>
        <Column>
          {events.map((event) => (
            <ListItem event={event} key={event.id} />
          ))}
        </Column>
      </ListContainer>
    );
  };

  return (
    <Container>
      <A href="#" onClick={toggle}>
        <NumberBadge>{events.length}</NumberBadge>
      </A>
      {expanded && renderList()}
    </Container>
  );
};

export default React.memo(UnknownEventsDropdown);
