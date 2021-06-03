import { utcToZonedTime } from 'date-fns-tz';
import React from 'react';

import { formatDate, timezone } from '~/common/utils';
import { Markdown } from '~/components';
import { A, Label, Row } from '~/frontkit';

import { TeamCalendarEventFragment } from '../queries.generated';

interface Props {
  event: TeamCalendarEventFragment;
}

const EventAnnouncements: React.FC<Props> = ({ event }) => {
  const posted_vk = event.announcements.vk && event.announcements.vk.link;
  const posted_fb = event.announcements.fb && event.announcements.fb.link;
  const posted_timepad =
    event.announcements.timepad && event.announcements.timepad.link;

  if (!posted_vk && !posted_fb && !posted_timepad) {
    return null;
  }

  return (
    <div>
      <strong>Анонсы:</strong> {posted_vk && <A href={posted_vk}>vk</A>}
      &nbsp;
      {posted_fb && <A href={posted_fb}>fb</A>}
      &nbsp;
      {posted_timepad && <A href={posted_timepad}>timepad</A>}
    </div>
  );
};

export const EventInfo: React.FC<Props> = ({ event }) => {
  const zonedStart = utcToZonedTime(event.start, timezone);
  const zonedEnd = utcToZonedTime(event.end, timezone);

  return (
    <div>
      <Row vCentered>
        <Label>Когда:</Label>
        <div>
          {formatDate(zonedStart, 'cccc, d MMMM')} ⋅{' '}
          {formatDate(zonedStart, 'HH:mm')} – {formatDate(zonedEnd, 'HH:mm')}
        </div>
      </Row>
      <Row vCentered>
        <Label>Где:</Label>
        <div>{event.room}</div>
      </Row>
      <Row vCentered>
        <Label>Создатель:</Label>
        <div>{event.creator || 'неизвестно'}</div>
      </Row>
      {event.description && (
        <div className="border-t border-gray-300 mt-5 overflow-auto">
          <Markdown source={event.description} />
        </div>
      )}
      <EventAnnouncements event={event} />
    </div>
  );
};

export default EventInfo;
