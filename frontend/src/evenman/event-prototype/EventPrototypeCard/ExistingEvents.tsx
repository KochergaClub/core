import React from 'react';
import { observer } from 'mobx-react-lite';

import styled from 'styled-components';

import moment from 'moment';

import { A } from '@kocherga/frontkit';

import { MutedSpan } from '../../components/ui';

import EventPrototype from '../../stores/EventPrototype';

const EventsTable = styled.table`
  width: 100%;
  border-spacing: 0;
  border-collapse: collapse;

  td,
  th {
    border: 1px solid #d0d0d0;
    padding: 2px 6px;
  }
  th {
    background-color: #e0e0e0;
  }
`;

const EventsTableRow = styled('tr')<{ past: boolean }>`
  background-color: ${(props: { past: boolean }) =>
    props.past ? '#f0f0f0' : 'white'};
`;

interface Props {
  prototype: EventPrototype;
}

const ExistingEvents: React.FC<Props> = observer(({ prototype }) => {
  const instances = prototype.instances;

  if (instances.state === 'not_loaded') {
    instances.load();
    return <div>Loading...</div>;
  }

  return (
    <div>
      {instances.items.length ? (
        <EventsTable>
          <tbody>
            <tr>
              <th>Дата</th>
              <th>Название</th>
              <th>Посетителей</th>
            </tr>
            {instances.items.map(e => (
              <EventsTableRow
                key={e.id}
                past={e.startMoment.isBefore(moment())}
              >
                <td>{e.startMoment.format('D MMMM')} </td>
                <td>
                  <A href={`/team/evenman/event/${e.id}`}>{e.title}</A>
                </td>
                <td>{e.visitors}</td>
              </EventsTableRow>
            ))}
          </tbody>
        </EventsTable>
      ) : (
        <MutedSpan>Нет мероприятий</MutedSpan>
      )}
    </div>
  );
});

export default ExistingEvents;
