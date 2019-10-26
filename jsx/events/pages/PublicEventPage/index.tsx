import { useRef } from 'react';

import styled from 'styled-components';

import { utcToZonedTime } from 'date-fns-tz';

import breaks from 'remark-breaks';
import Markdown from 'react-markdown';

import { RichText } from '@kocherga/frontkit';

import { NextPage } from '~/common/types';
import { timezone, formatDate } from '~/common/utils';
import { APIError } from '~/common/api';
import { selectAPI, selectUser } from '~/core/selectors';

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
// import Registration from './Registration';
import TimepadRegistration from './TimepadRegistration';

const Smooth = styled.div`
  scroll-behavior: smooth;
`;

export interface Props {
  serverEvent: ServerPublicEvent;
  ticket?: EventTicket;
}

const PublicEventPage: NextPage<Props> = ({ serverEvent }) => {
  const event = serverPublicEventToEvent(serverEvent);

  const zonedStart = utcToZonedTime(event.start, timezone);
  const title = `${event.title} - ${formatDate(zonedStart, 'd MMMM')}`;

  const registrationRef = useRef<HTMLElement | null>(null);

  return (
    <Page title={title}>
      <Smooth>
        <EventHeroBlock event={event} registrationRef={registrationRef} />
        <EventAnnouncements event={event} />
        <PaddedBlock>
          <RichText>
            <Markdown source={event.description} plugins={[breaks]} />
          </RichText>
        </PaddedBlock>
        <section ref={registrationRef}>
          <TL03 title="Регистрация" grey />
          <PaddedBlock>
            <TimepadRegistration event={event} />
          </PaddedBlock>
        </section>
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
      const ticket = await api.call(`events/${event_id}/tickets/my`, 'GET'); // FIXME - can return 404
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
