import { connect } from 'react-redux';

import styled from 'styled-components';

import { utcToZonedTime } from 'date-fns-tz';

import breaks from 'remark-breaks';
import Markdown from 'react-markdown';

import { A, RichText, Row, Label } from '@kocherga/frontkit';

import { State } from '~/redux/store';
import { timezone, formatDate } from '~/common/utils';

import { selectEventById } from '../selectors';
import { Event } from '../types';

interface Props {
  event: Event;
}

const EventDescription = styled.div`
  border-top: 1px solid #ddd;
  margin-top: 20px;
  overflow: auto;
`;

const EventAnnouncements: React.FC<Props> = ({ event }) => {
  if (!event.posted_vk && !event.posted_fb && !event.posted_timepad) {
    return null;
  }

  return (
    <div>
      <strong>Анонсы:</strong>{' '}
      {event.posted_vk && <A href={event.posted_vk}>vk</A>}
      &nbsp;
      {event.posted_fb && <A href={event.posted_fb}>fb</A>}
      &nbsp;
      {event.posted_timepad && <A href={event.posted_timepad}>timepad</A>}
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
        <EventDescription>
          <RichText>
            <Markdown source={event.description} plugins={[breaks]} />
          </RichText>
        </EventDescription>
      )}
      <EventAnnouncements event={event} />
    </div>
  );
};

const mapStateToProps = (state: State, ownProps: { event_id: string }) => ({
  event: selectEventById(state, ownProps.event_id),
});

export default connect(mapStateToProps)(EventInfo);
