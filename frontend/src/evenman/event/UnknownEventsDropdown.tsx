import React, { useCallback } from 'react';
import { FaGlobeAfrica, FaLock } from 'react-icons/fa';
import styled from 'styled-components';

import { useMutation, useQuery } from '@apollo/client';

import { DropdownMenu } from '~/components';
import { AsyncButton, Button, Column, Row } from '~/frontkit';

import {
    EvenmanSetEventTypeDocument, EvenmanUnknownEventFragment, EvenmanUnknownEventsDocument
} from './queries.generated';

const ListContainer = styled.div`
  background: white;
  padding: 4px 8px;
  min-width: 300px;
`;

const ControlButton = styled(AsyncButton).attrs({ size: 'small' })`
  width: 40px;
`;

const ListItem = ({ event }: { event: EvenmanUnknownEventFragment }) => {
  const [setEventType] = useMutation(EvenmanSetEventTypeDocument, {
    refetchQueries: ['EvenmanUnknownEvents'],
    awaitRefetchQueries: true,
  });

  const setPublic = useCallback(async () => {
    await setEventType({
      variables: {
        id: event.id,
        event_type: 'public',
      },
    });
  }, [event.id, setEventType]);

  const setPrivate = useCallback(async () => {
    await setEventType({
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
        <ControlButton act={setPublic}>
          <FaGlobeAfrica style={{ color: 'green' }} />
        </ControlButton>
        <ControlButton act={setPrivate}>
          <FaLock style={{ color: 'red' }} />
        </ControlButton>
      </Row>
    </Row>
  );
};

const UnknownEventsDropdown: React.FC = () => {
  const queryResults = useQuery(EvenmanUnknownEventsDocument);

  if (!queryResults.data) {
    return null;
  }

  const events = queryResults.data.events.nodes;

  const renderList = () => {
    return (
      <ListContainer>
        {events.length ? (
          <Column>
            {events.map((event) => (
              <ListItem event={event} key={event.id} />
            ))}
          </Column>
        ) : (
          <div>Нет событий для разметки</div>
        )}
      </ListContainer>
    );
  };

  if (!events.length) {
    return null;
  }

  return (
    <DropdownMenu
      placement="bottom-start"
      render={() => (
        <Button size="small" kind="danger">
          Неразмеченные события: {events.length}
        </Button>
      )}
    >
      {renderList()}
    </DropdownMenu>
  );
};

export default React.memo(UnknownEventsDropdown);
