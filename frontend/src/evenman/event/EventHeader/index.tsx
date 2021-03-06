import { formatDistanceToNow, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

import { useMutation } from '@apollo/client';

import { formatDate } from '~/common/utils';
import { Column, Row } from '~/frontkit';

import { EditableString } from '../../components/EditableString';
import { MutedSpan } from '../../components/ui';
import EditableDateSpan from '../EditableDateSpan';
import EventDropdownMenu from '../EventDropdownMenu';
import { useUpdateMutation } from '../hooks';
import { EvenmanEvent_DetailsFragment, EvenmanEventMoveDocument } from '../queries.generated';
import EventTypeField from './EventTypeField';

const DateSpan: React.FC<{ date: Date }> = ({ date }) => (
  <span>
    <b>{formatDate(date, 'EEEEEE').toUpperCase()}</b>{' '}
    {formatDate(date, 'd MMMM')}, {formatDate(date, 'HH:mm')}
    {' ('}
    {formatDistanceToNow(date, { locale: ru, addSuffix: true })}
    {')'}
  </span>
);

interface Props {
  event: EvenmanEvent_DetailsFragment;
}

const EventHeader: React.FC<Props> = ({ event }) => {
  const update = useUpdateMutation(event.id);
  const [moveMutation] = useMutation(EvenmanEventMoveDocument);

  return (
    // TODO - refactor messy layout with display: grid
    <Column centered>
      <Row spaced>
        <div style={{ flex: 1 }}>
          <EventTypeField event={event} />
        </div>
        <div style={{ fontSize: '1.4em' }}>
          <EditableString
            value={event.title}
            renderValue={(ref) => <strong ref={ref}>{event.title}</strong>}
            save={(value) => update({ title: value })}
          />
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <EventDropdownMenu event={event} />
        </div>
      </Row>
      <Row spaced>
        <div style={{ flex: 1 }}>
          {event.tickets.length ? (
            <div>Регистраций: {event.tickets.length}</div>
          ) : null}
        </div>

        <div>
          <EditableDateSpan
            date={parseISO(event.start)}
            onChange={(date) =>
              moveMutation({
                variables: {
                  event_id: event.id,
                  start: date.toISOString(),
                },
              })
            }
          />
        </div>
        <div
          style={{
            flex: 1,
            display: 'flex',
            justifyContent: 'flex-end',
            alignSelf: 'flex-end',
          }}
        >
          <small>
            <MutedSpan>
              Создано: <DateSpan date={parseISO(event.created)} />
            </MutedSpan>
          </small>
        </div>
      </Row>
    </Column>
  );
};

export default EventHeader;
