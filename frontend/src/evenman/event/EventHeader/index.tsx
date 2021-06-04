import { formatDistanceToNow, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';
import React from 'react';

import { useMutation } from '@apollo/client';

import { formatDate } from '~/common/utils';
import { Row } from '~/frontkit';

import { EditableString } from '../../components/EditableString';
import { MutedSpan } from '../../components/ui';
import { EditableDateTime } from '../EditableDateTime';
import { EventDropdownMenu } from '../EventDropdownMenu';
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

export const EventHeader: React.FC<Props> = ({ event }) => {
  const update = useUpdateMutation(event.id);
  const [moveMutation] = useMutation(EvenmanEventMoveDocument);

  return (
    // TODO - refactor messy layout with display: grid
    <div className="space-y-1">
      <Row>
        <div className="flex-1">
          <EventTypeField event={event} />
        </div>
        <div className="text-2xl">
          <EditableString
            value={event.title}
            renderValue={(ref) => <strong ref={ref}>{event.title}</strong>}
            save={(value) => update({ title: value })}
          />
        </div>
        <div className="flex-1 flex justify-end">
          <EventDropdownMenu event={event} />
        </div>
      </Row>
      <Row>
        <div className="flex-1">
          {event.tickets.length ? (
            <div>Регистраций: {event.tickets.length}</div>
          ) : null}
        </div>
        <div>
          <EditableDateTime
            title={event.title}
            date={parseISO(event.start)}
            onChange={async (date) =>
              await moveMutation({
                variables: {
                  event_id: event.id,
                  start: date.toISOString(),
                },
              })
            }
          />
        </div>
        <div className="flex-1 flex justify-end self-end">
          <small>
            <MutedSpan>
              Создано: <DateSpan date={parseISO(event.created)} />
            </MutedSpan>
          </small>
        </div>
      </Row>
    </div>
  );
};
