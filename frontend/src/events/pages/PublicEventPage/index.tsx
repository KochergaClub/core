import { useRef } from 'react';

import styled from 'styled-components';

import { differenceInCalendarDays } from 'date-fns';

import { utcToZonedTime } from 'date-fns-tz';

import breaks from 'remark-breaks';
import Markdown from 'react-markdown';

import { RichText } from '@kocherga/frontkit';

import { withApollo } from '~/apollo/client';

import { NextApolloPage } from '~/apollo/types';
import { timezone, formatDate } from '~/common/utils';
import { APIError } from '~/common/api';

import { Page, PaddedBlock } from '~/components';
import TL03 from '~/blocks/TL03';

import {
  GetPublicEventQuery,
  GetPublicEventDocument,
} from './queries.generated';

import ProjectInfo from './ProjectInfo';
import EventAnnouncements from './EventAnnouncements';
import EventHeroBlock from './EventHeroBlock';
import AnyRegistration from './AnyRegistration';
import Map from './Map';

import { CommonProps } from './types';

const Container = styled.div`
  scroll-behavior: smooth;
  margin-bottom: 120px;
`;

const RegistrationSection = styled.section`
  margin-bottom: 120px;
`;

const PublicEventPage: NextApolloPage<CommonProps> = ({ event }) => {
  const zonedStart = utcToZonedTime(new Date(event.start), timezone);
  const title = `${event.title} - ${formatDate(zonedStart, 'd MMMM')}`;

  const registrationRef = useRef<HTMLElement | null>(null);

  const daysUntil = differenceInCalendarDays(new Date(event.start), new Date());
  const inFuture = daysUntil >= 0;

  return (
    <Page title={title} og={{ image: event.image || undefined }}>
      <Container>
        <EventHeroBlock event={event} registrationRef={registrationRef} />

        <ProjectInfo event={event} />
        <EventAnnouncements event={event} />
        <PaddedBlock>
          <RichText>
            <Markdown source={event.description} plugins={[breaks]} />
          </RichText>
        </PaddedBlock>
        {inFuture ? (
          <div>
            <a id="register" />
            <RegistrationSection ref={registrationRef}>
              <TL03 title="Регистрация" grey />
              <PaddedBlock>
                <AnyRegistration event={event} />
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

PublicEventPage.getInitialProps = async ({ apolloClient, query }) => {
  const event_id = query.id as string;

  const result = await apolloClient.query<GetPublicEventQuery>({
    query: GetPublicEventDocument,
    variables: {
      event_id,
    },
  });

  if (!result.data) {
    throw new APIError('Expected query data', 500);
  }

  if (result.errors) {
    throw new APIError('Got query errors', 500);
  }

  return {
    event: result.data.publicEvent,
  };
};

export default withApollo(PublicEventPage);
