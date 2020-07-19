import dynamic from 'next/dynamic';

import { withApollo, NextApolloPage } from '~/apollo';
import { Page } from '~/components';

import UpcomingEventsListBlock from '../components/UpcomingEventsListBlock';

const PublicEventsCalendar = dynamic(
  () => import('../components/PublicEventsCalendar'),
  { ssr: false }
);

const PublicEventIndexPage: NextApolloPage = () => {
  return (
    <Page title="Расписание мероприятий - iframe" chrome="none">
      <PublicEventsCalendar />
      <UpcomingEventsListBlock />
    </Page>
  );
};

export { getStaticProps } from './PublicEventIndexPage';

export default withApollo(PublicEventIndexPage, { ssr: false });
