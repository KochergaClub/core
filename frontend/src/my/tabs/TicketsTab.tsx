import Link from 'next/link';

import { HintCard } from '~/components';
import { publicEventsRootRoute } from '~/events/routes';
import { A, Column, HR, Row } from '~/frontkit';

import TicketsList from '../components/TicketsList';
import { MyTicketsPageFragment } from '../queries.generated';

const OtherEvents = () => (
  <Row centered>
    <Link href={publicEventsRootRoute()} passHref>
      <A>Посмотреть календарь всех событий</A>
    </Link>
  </Row>
);

interface Props {
  my: MyTicketsPageFragment;
}

const TicketsTab: React.FC<Props> = ({ my }) => {
  return (
    <article>
      <TicketsList my={my} />
      <HR />
      <OtherEvents />
      <HR />
      <Column centered>
        <HintCard>
          Кочерга развивается благодаря поддержке участниками сообщества.
          Подпишитесь на наш{' '}
          <A href="https://www.patreon.com/kocherga">Patreon</A>, чтобы мы могли
          и дальше организовывать встречи.
        </HintCard>
      </Column>
    </article>
  );
};

export default TicketsTab;
