import { GetServerSideProps } from 'next';
import dynamic from 'next/dynamic';

import { NextApolloPage, withApollo } from '~/apollo';
import { apolloClientForDataFetching } from '~/apollo/client';
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
      <TL03 title="Расписание мероприятий" grey />
      <PublicEventsCalendar />
      <UpcomingEventsListBlock />
    </Page>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const apolloClient = await apolloClientForDataFetching();

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
    // revalidate: 1,
  };
};

export default withApollo(PublicEventIndexPage, { ssr: false });
