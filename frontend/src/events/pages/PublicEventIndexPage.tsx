import dynamic from 'next/dynamic';

const PublicEventsCalendar = dynamic(
  () => import('../components/PublicEventsCalendar'),
  { ssr: false }
);

import { A } from '@kocherga/frontkit';

import { withApollo, NextApolloPage } from '~/apollo';

import TL03 from '~/blocks/TL03';
import UpcomingEventsListBlock from '../components/UpcomingEventsListBlock';
import { Page } from '~/components';
import { formatDate } from '~/common/utils';
import { GetStaticProps } from 'next';
import { initApolloClient } from '~/apollo/client';
import {
  CurrentUserQuery,
  CurrentUserDocument,
} from '~/auth/queries.generated';
import { UpcomingPublicEventsDocument } from '../queries.generated';

const PublicEventIndexPage: NextApolloPage = () => {
  return (
    <Page title="Расписание мероприятий">
      <TL03 title="Расписание мероприятий" grey>
        {false && ( // disabled because offline space is on quarantine
          <>
            У нас 4 комнаты разного размера, так что если в какое-то время идёт
            мероприятие, это не значит, что свободных комнат нет.
            <br />
            <br />
            Если хотите забронировать комнату под день рождения, мероприятие или
            просто посиделки, звоните +7(499)350-20-42 или воспользуйтесь{' '}
            <A href="https://booking.kocherga.club">формой брони</A>.
          </>
        )}
      </TL03>

      <PublicEventsCalendar />
      <UpcomingEventsListBlock />
    </Page>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initApolloClient();

  // FIXME - copy-paste from apollo/client
  const currentUserQueryResult = await apolloClient.query<CurrentUserQuery>({
    query: CurrentUserDocument,
  });

  if (!currentUserQueryResult.data) {
    throw new Error('CurrentUser query failed');
  }

  // TODO - pass date to page props to avoid inconsistencies?
  await apolloClient.query({
    query: UpcomingPublicEventsDocument,
    variables: {
      today: formatDate(new Date(), 'yyyy-MM-dd'),
    },
  });

  return {
    props: {
      apolloState: apolloClient.cache.extract(),
      unstable_revalidate: 1,
    },
  };
};

export default withApollo(PublicEventIndexPage, { ssr: false });
