import Link from 'next/link';
import { A, HR, Row } from '@kocherga/frontkit';

import TicketsList from '../components/TicketsList';

import { MyPageFragment } from '../queries.generated';

const OtherEvents = () => (
  <Row centered>
    <Link href="/events" passHref>
      <A>Посмотреть ближайшие события</A>
    </Link>
  </Row>
);

interface Props {
  my: MyPageFragment;
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
