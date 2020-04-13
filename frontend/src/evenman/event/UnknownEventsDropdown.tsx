import { useCallback, useState } from 'react';

import styled from 'styled-components';

import { A, Button, Column, Row } from '@kocherga/frontkit';
import { FaGlobeAfrica, FaLock } from 'react-icons/fa';

import { NumberBadge } from '../components/ui';

import {
  EvenmanUnknownEventFragment,
  useEvenmanUnknownEventsQuery,
  useEvenmanSetEventTypeMutation,
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
        id: event.event_id,
        event_type: 'public',
      },
    });
  }, [event.event_id, setEventType]);

  const setPrivate = useCallback(() => {
    setEventType({
      variables: {
        id: event.event_id,
        event_type: 'private',
      },
    });
  }, [event.event_id, setEventType]);

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
    (e: React.SyntheticEvent<EventTarget>) => {
      e.preventDefault();
      setExpanded(!expanded);
    },
    [expanded]
  );

  if (!queryResults.data) {
    return null;
  }

  const events = queryResults.data.events.nodes;

  const renderList = () => {
    return (
      <ListContainer>
        <Column>
          {events.map(event => (
            <ListItem event={event} key={event.event_id} />
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

export default UnknownEventsDropdown;
