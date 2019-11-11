import React, { useCallback, useState } from 'react';
import { observer } from 'mobx-react-lite';

import styled from 'styled-components';

import EventView from '../views/EventView';

import { A, Button, Column, Row } from '@kocherga/frontkit';
import { FaGlobe, FaLock } from 'react-icons/fa';

import { Event } from '../stores/Event';

import { NumberBadge } from '../components/ui';

interface Props {
  view: EventView;
}

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

const ListItem = observer(({ event }: { event: Event }) => {
  const setPublic = useCallback(() => event.setType('public'), [event]);
  const setPrivate = useCallback(() => event.setType('private'), [event]);
  return (
    <Row stretch spaced>
      <small>{event.title}</small>
      <Row>
        <ControlButton onClick={setPublic}>
          <FaGlobe style={{ color: 'green' }} />
        </ControlButton>
        <ControlButton onClick={setPrivate}>
          <FaLock style={{ color: 'red' }} />
        </ControlButton>
      </Row>
    </Row>
  );
});

const UnknownEventsDropdown = observer(({ view }: Props) => {
  const [expanded, setExpanded] = useState(false);

  const toggle = useCallback(
    (e: React.SyntheticEvent<EventTarget>) => {
      e.preventDefault();
      setExpanded(!expanded);
    },
    [expanded]
  );

  const renderList = () => {
    return (
      <ListContainer>
        <Column>
          {view.filter.unknownEvents.map(event => (
            <ListItem event={event} key={event.id} />
          ))}
        </Column>
      </ListContainer>
    );
  };

  return (
    <Container>
      <A href="#" onClick={toggle}>
        <NumberBadge>{view.filter.unknownEvents.length}</NumberBadge>
      </A>
      {expanded && renderList()}
    </Container>
  );
});

export default UnknownEventsDropdown;
