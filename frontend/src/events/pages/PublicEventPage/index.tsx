import { differenceInCalendarDays, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import React, { useRef } from 'react';
import styled from 'styled-components';

import { useQuery } from '@apollo/client';

import { NextApolloPage, withApollo } from '~/apollo';
import TL03 from '~/blocks/TL03';
import { formatDate, timezone } from '~/common/utils';
import { ApolloQueryResults, Markdown, PaddedBlock, Page } from '~/components';
import ErrorBlock from '~/error-pages/ErrorBlock';

import AnyRegistration from './AnyRegistration';
import EventAnnouncements from './EventAnnouncements';
import EventHeroBlock from './EventHeroBlock';
import EventToCalendar from './EventToCalendar';
import Map from './Map';
import ProjectInfo from './ProjectInfo';
import { GetPublicEventDocument } from './queries.generated';

const Container = styled.div`
  scroll-behavior: smooth;
  margin-bottom: 120px;
`;

const RegistrationSection = styled.section`
  margin-bottom: 120px;
`;

interface Props {
  event_id: string;
}

export const PublicEventPage: NextApolloPage<Props> = ({ event_id }) => {
  const queryResults = useQuery(GetPublicEventDocument, {
    variables: {
      event_id,
    },
  });

  const registrationRef = useRef<HTMLElement | null>(null);

  const event = queryResults.data?.publicEvent;

  const title = queryResults.loading
    ? 'Загружается'
    : event
    ? `${event.title} - ${formatDate(
        utcToZonedTime(parseISO(event.start), timezone),
        'd MMMM'
      )}`
    : 'Событие не найдено';

  return (
    <Page
      title={title}
      og={{ image: event?.image?.url || undefined }}
      description={event?.summary}
    >
      <ApolloQueryResults {...queryResults} size="block">
        {() => {
          if (!event) {
            return <ErrorBlock code={404} title="Событие не найдено" />;
          }

          const daysUntil = differenceInCalendarDays(
            parseISO(event.start),
            new Date()
          );
          const inFuture = daysUntil >= 0;

          return (
            <Container>
              <EventHeroBlock event={event} registrationRef={registrationRef} />

              <ProjectInfo event={event} />
              <EventAnnouncements event={event} />
              <PaddedBlock>
                <Markdown source={event.description} />
              </PaddedBlock>
              <EventToCalendar event={event} />
              {inFuture ? (
                <div>
                  <a id="register" />
                  <RegistrationSection ref={registrationRef}>
                    <TL03 title="Регистрация" grey />
                    <PaddedBlock>
                      <AnyRegistration event={event} />
                    </PaddedBlock>
                  </RegistrationSection>
                  {event.realm === 'offline' ? (
                    <section>
                      <TL03 title="Как добраться" grey />
                      <Map />
                    </section>
                  ) : null}
                </div>
              ) : null}
            </Container>
          );
        }}
      </ApolloQueryResults>
    </Page>
  );
};

PublicEventPage.getInitialProps = async ({ query }) => {
  const event_id = query.id as string;

  return { event_id };
};

export default withApollo(PublicEventPage);
