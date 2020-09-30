import { differenceInCalendarDays, parseISO } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { GetServerSideProps } from 'next';
import { useRef } from 'react';
import Markdown from 'react-markdown';
import breaks from 'remark-breaks';
import styled from 'styled-components';

import { useQuery } from '@apollo/client';
import { RichText } from '@kocherga/frontkit';

import { NextApolloPage, withApollo } from '~/apollo';
import { apolloClientForStaticProps } from '~/apollo/client';
import TL03 from '~/blocks/TL03';
import { formatDate, timezone } from '~/common/utils';
import { ApolloQueryResults, PaddedBlock, Page } from '~/components';
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

export const getServerSideProps: GetServerSideProps<
  Props,
  { id: string }
> = async ({ params, req }) => {
  const event_id = params!.id;
  const apolloClient = await apolloClientForStaticProps(req);

  await apolloClient.query({
    query: GetPublicEventDocument,
    variables: {
      event_id,
    },
  });

  return {
    props: {
      event_id,
      apolloState: apolloClient.cache.extract(),
    },
  };
};

export default withApollo(PublicEventPage, { ssr: false });
