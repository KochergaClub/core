import Link from 'next/link';

import { A, Column, HR, Row } from '@kocherga/frontkit';

import { HintCard } from '~/components';

import TicketsList from '../components/TicketsList';
import { MyTicketsPageFragment } from '../queries.generated';

const OtherEvents = () => (
  <Row centered>
    <Link href="/events" passHref>
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
