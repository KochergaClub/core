import Link from 'next/link';
import { A, HR, Row } from '@kocherga/frontkit';

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
    </article>
  );
};

export default TicketsTab;
