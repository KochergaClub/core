import { useRef } from 'react';

import styled from 'styled-components';

import { differenceInCalendarDays } from 'date-fns';

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

import { getWagtailPage } from '~/wagtail/utils';
import { ProjectPageType } from '~/projects/utils';

import ProjectInfo from './ProjectInfo';
import EventAnnouncements from './EventAnnouncements';
import EventHeroBlock from './EventHeroBlock';
import Registration from './Registration';
import Map from './Map';
// import TimepadRegistration from './TimepadRegistration';

const Container = styled.div`
  scroll-behavior: smooth;
  margin-bottom: 120px;
`;

const RegistrationSection = styled.section`
  margin-bottom: 120px;
`;

export interface Props {
  serverEvent: ServerPublicEvent;
  ticket?: EventTicket;
  project?: ProjectPageType;
}

const PublicEventPage: NextPage<Props> = ({ serverEvent, ticket, project }) => {
  const event = serverPublicEventToEvent(serverEvent);

  const zonedStart = utcToZonedTime(event.start, timezone);
  const title = `${event.title} - ${formatDate(zonedStart, 'd MMMM')}`;

  const registrationRef = useRef<HTMLElement | null>(null);

  const daysUntil = differenceInCalendarDays(event.start, new Date());
  const inFuture = daysUntil >= 0;

  return (
    <Page title={title} og={{ image: event.image }}>
      <Container>
        <EventHeroBlock event={event} registrationRef={registrationRef} />

        {project ? <ProjectInfo event={event} project={project} /> : null}
        <EventAnnouncements event={event} />
        <PaddedBlock>
          <RichText>
            <Markdown source={event.description} plugins={[breaks]} />
          </RichText>
        </PaddedBlock>
        {inFuture ? (
          <div>
            <RegistrationSection ref={registrationRef}>
              <TL03 title="Регистрация" grey />
              <PaddedBlock>
                <Registration event={event} ticket={ticket} />
              </PaddedBlock>
            </RegistrationSection>
            <section>
              <TL03 title="Как добраться" grey />
              <Map />
            </section>
          </div>
        ) : null}
      </Container>
    </Page>
  );
};

PublicEventPage.getInitialProps = async ({ store: { getState }, query }) => {
  const api = selectAPI(getState());
  const user = selectUser(getState());

  const event_id = query.id as string;

  const serverEvent = (await api.call(
    `public_events/${event_id}`,
    'GET'
  )) as ServerPublicEvent;

  let project: ProjectPageType | undefined;
  if (serverEvent.project) {
    project = (await getWagtailPage(
      api,
      serverEvent.project
    )) as ProjectPageType;
  }

  const result: Props = { serverEvent, project };

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
