import { useRef } from 'react';

import styled from 'styled-components';

import { parseISO, differenceInCalendarDays } from 'date-fns';

import { utcToZonedTime } from 'date-fns-tz';

import breaks from 'remark-breaks';
import Markdown from 'react-markdown';

import { RichText } from '@kocherga/frontkit';

import { withApollo, NextApolloPage } from '~/apollo';

import { timezone, formatDate } from '~/common/utils';

import { Page, PaddedBlock, ApolloQueryResults } from '~/components';
import TL03 from '~/blocks/TL03';
import ErrorBlock from '~/error-pages/ErrorBlock';

import { useGetPublicEventQuery } from './queries.generated';

import ProjectInfo from './ProjectInfo';
import EventAnnouncements from './EventAnnouncements';
import EventHeroBlock from './EventHeroBlock';
import AnyRegistration from './AnyRegistration';
import Map from './Map';
import EventToCalendar from './EventToCalendar';

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

const PublicEventPage: NextApolloPage<Props> = ({ event_id }) => {
  const queryResults = useGetPublicEventQuery({
    variables: {
      event_id,
    },
    fetchPolicy: 'network-only',
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
                <RichText>
                  <Markdown source={event.description} plugins={[breaks]} />
                </RichText>
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
