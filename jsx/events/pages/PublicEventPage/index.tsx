import { useRef } from 'react';

import styled from 'styled-components';

import { differenceInDays } from 'date-fns';

import { utcToZonedTime } from 'date-fns-tz';

import breaks from 'remark-breaks';
import Markdown from 'react-markdown';

import { RichText } from '@kocherga/frontkit';

import { NextPage } from '~/common/types';
import { timezone, formatDate } from '~/common/utils';
import { APIError } from '~/common/api';
import { selectAPI, selectUser } from '~/core/selectors';

import AlertCard from '~/components/AlertCard';
import PaddedBlock from '~/components/PaddedBlock';
import Page from '~/components/Page';
import TL03 from '~/blocks/TL03';

import {
  ServerPublicEvent,
  serverPublicEventToEvent,
  EventTicket,
} from '~/events/types';

import EventAnnouncements from './EventAnnouncements';
import EventHeroBlock from './EventHeroBlock';
import Registration from './Registration';
// import TimepadRegistration from './TimepadRegistration';

const Smooth = styled.div`
  scroll-behavior: smooth;
`;

export interface Props {
  serverEvent: ServerPublicEvent;
  ticket?: EventTicket;
}

const PublicEventPage: NextPage<Props> = ({ serverEvent, ticket }) => {
  const event = serverPublicEventToEvent(serverEvent);

  const zonedStart = utcToZonedTime(event.start, timezone);
  const title = `${event.title} - ${formatDate(zonedStart, 'd MMMM')}`;

  const registrationRef = useRef<HTMLElement | null>(null);

  const daysUntil = differenceInDays(event.start, new Date());

  return (
    <Page title={title} og={{ image: event.image }}>
      <Smooth>
        <EventHeroBlock event={event} registrationRef={registrationRef} />
        <EventAnnouncements event={event} />
        <PaddedBlock>
          <RichText>
            <Markdown source={event.description} plugins={[breaks]} />
          </RichText>
        </PaddedBlock>
        {daysUntil >= 0 ? (
          <section ref={registrationRef}>
            <TL03 title="Регистрация" grey />
            <PaddedBlock>
              <Registration event={event} ticket={ticket} />
            </PaddedBlock>
          </section>
        ) : (
          <AlertCard>
            <RichText>
              Это событие прошло.
              <br />
              Посмотрите, что будет в Кочерге{' '}
              <a href="/#schedule">в ближайшие дни.</a>
            </RichText>
          </AlertCard>
        )}
      </Smooth>
    </Page>
  );
};

PublicEventPage.getInitialProps = async ({ store: { getState }, query }) => {
  const api = selectAPI(getState());
  const user = selectUser(getState());

  const event_id = query.id as string;

  const serverEvent = await api.call(`public_events/${event_id}`, 'GET');

  const result: Props = { serverEvent };
  if (user.is_authenticated) {
    try {
      const ticket = await api.call(`events/${event_id}/my_ticket`, 'GET'); // FIXME - can return 404
      result.ticket = ticket;
    } catch (e) {
      if (e instanceof APIError && e.status === 404) {
        // that's ok, user is not registered yet
      } else {
        throw e;
      }
    }
  }

  return result;
};

export default PublicEventPage;
