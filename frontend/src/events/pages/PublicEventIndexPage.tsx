import { GetStaticProps } from 'next';
import dynamic from 'next/dynamic';

import { A } from '~/frontkit';

import { NextApolloPage, withApollo } from '~/apollo';
import { apolloClientForStaticProps } from '~/apollo/client';
import TL03 from '~/blocks/TL03';
import { formatDate } from '~/common/utils';
import { Page, Spinner } from '~/components';

import UpcomingEventsListBlock from '../components/UpcomingEventsListBlock';
import { UpcomingPublicEventsDocument } from '../queries.generated';

const loadingCalendar = () => <Spinner size="div" />;

const PublicEventsCalendar = dynamic(
  () => import('../components/PublicEventsCalendar'),
  { ssr: false, loading: loadingCalendar }
);

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
  const apolloClient = await apolloClientForStaticProps();

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
    },
    revalidate: 1,
  };
};

export default withApollo(PublicEventIndexPage, { ssr: false });
