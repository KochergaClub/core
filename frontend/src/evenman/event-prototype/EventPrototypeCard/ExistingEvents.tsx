import { isBefore, parseISO } from 'date-fns';
import Link from 'next/link';
import styled from 'styled-components';

import { formatDate } from '~/common/utils';
import { A } from '~/frontkit';

import { MutedSpan } from '../../components/ui';
import { eventRoute } from '../../routes';
import { EventsPrototypeFragment } from '../queries.generated';

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
  prototype: EventsPrototypeFragment;
}

const ExistingEvents: React.FC<Props> = ({ prototype }) => {
  const instances = prototype.instances;

  return (
    <div>
      {instances.length ? (
        <EventsTable>
          <tbody>
            <tr>
              <th>Дата</th>
              <th>Название</th>
              <th>Посетителей</th>
            </tr>
            {instances.map((e) => (
              <EventsTableRow
                key={e.id}
                past={isBefore(parseISO(e.start), new Date())}
              >
                <td>{formatDate(parseISO(e.start), 'd MMMM')} </td>
                <td>
                  <Link href={eventRoute(e.id)} passHref>
                    <A>{e.title}</A>
                  </Link>
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
};

export default ExistingEvents;
